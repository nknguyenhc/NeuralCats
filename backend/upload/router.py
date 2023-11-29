from fastapi import APIRouter, Form, UploadFile
from typing import List
from typing_extensions import Annotated

upload_router = APIRouter(
    prefix="/request",
    responses={404: { "description": "Not found" }},
)

@upload_router.post("/")
async def upload(files: List[UploadFile], module: Annotated[str, Form()]):
    return {
        "test": "hello",
    }
