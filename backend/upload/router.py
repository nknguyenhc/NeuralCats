from fastapi import APIRouter, Form, UploadFile
from typing import List
from typing_extensions import Annotated
from azure.cosmos.cosmos_client import CosmosClient
from azure.storage.blob import ContainerClient
import os
from uuid import uuid4

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
        blob_client = container_client.get_blob_client(blob=f"{request_id}_{filename['modified']}_{filename['original']}")
        blob_client.upload_blob(file.file)

    return {
        "message": "success",
        "info": {
            "module": module,
            "files": filenames,
        }
    }
