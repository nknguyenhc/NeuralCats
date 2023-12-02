from fastapi import APIRouter, Form, UploadFile, Request, Response
from typing import List
from typing_extensions import Annotated
from azure.cosmos.cosmos_client import CosmosClient
from azure.storage.blob import ContainerClient
import os
from uuid import uuid4
from users.router import get_user

upload_router = APIRouter(
    prefix="/request",
    responses={404: { "description": "Not found" }},
)

def get_container():
    client = CosmosClient(os.environ.get('COSMOS_HOST'), { 'masterKey': os.environ.get('COSMOS_KEY') })
    db = client.get_database_client(os.environ.get('COSMOS_DB_ID'))
    return db.get_container_client('Requests')

def get_storage():
    return ContainerClient(os.environ.get('STORAGE_NAME'), "requests", credential=os.environ.get("STORAGE_CORR"))

@upload_router.post("/")
async def upload(files: List[UploadFile], module: Annotated[str, Form()]):
    request_id = str(uuid4())
    filenames = list(map(
        lambda file: {
            "original": file.filename,
            "modified": str(uuid4()),
        },
        files,
    ))
    get_container().create_item(body={
        "module": module,
        "files": filenames,
        "id": request_id,
    })

    container_client = get_storage()
    for file, filename in zip(files, filenames):
        blob_client = container_client.get_blob_client(blob=f"{request_id}/{filename['modified']}_{filename['original']}")
        blob_client.upload_blob(file.file)

    return {
        "message": "success",
        "info": {
            "module": module,
            "files": filenames,
        }
    }

@upload_router.get("/")
async def get_requests(request: Request, response: Response):
    user = get_user(request)
    if user is None or not user.is_staff:
        response.status_code = 401
        return {
            "message": "not authorized",
        }
    
    items = get_container().read_all_items()
    return {
        "requests": list(map(
            lambda item: ({
                "id": item["id"],
                "module": item["module"],
                "files": item["files"],
            }),
            items,
        )),
    }

@upload_router.get("/{request_id}/{filename}")
async def get_file(request: Request, request_id: str, filename: str):
    user = get_user(request)
    if user is None or not user.is_staff:
        return {
            "message": "not authorized",
        }
    
    blob = get_storage().download_blob(f"{request_id}/{filename}")
    return Response(content=blob.readall())
