from fastapi import APIRouter, Response
from pydantic import BaseModel
from azure.cosmos.cosmos_client import CosmosClient
from azure.storage.blob import ContainerClient
from azure.core.exceptions import ResourceNotFoundError
import os
from .pdf import content_to_pdf
from model.qna2 import prompt
from utils.response_to_json import response_to_json

qna_router = APIRouter(
    prefix="/qna",
    responses={404: {"description": "Not found" }},
)

def get_container():
    client = CosmosClient(os.environ.get('COSMOS_HOST'), { 'masterKey': os.environ.get('COSMOS_KEY') })
    db = client.get_database_client(os.environ.get('COSMOS_DB_ID'))
    return db.get_container_client('Modules')

def get_storage():
    return ContainerClient(os.environ.get('STORAGE_NAME'), "quiz", credential=os.environ.get("STORAGE_CORR"))

@qna_router.get("/available-mods")
async def get_available_mods():
    values = get_container().read_all_items()
    return list(map(
        lambda item: ({
            "fullname": item["fullname"],
            "code": item["code"],
        }),
        values,
    ))

@qna_router.get("/")
async def get_qna(mod: str, difficulty: str):
    numQns = 6 # tenporary placeholder
    storage = get_storage()
    response = prompt(storage, numQns, difficulty)
    formatted_response = "\n\n".join(response.split("\n"))
    idx = formatted_response.find("Answer Key:")
    questions = response[10:idx]
    answers = response[idx+11:]

    pdf_question_id = content_to_pdf(questions, mod, "Questions", storage)
    pdf_answer_id = content_to_pdf(answers, mod, "Answers", storage)
    qna_json = response_to_json(response)

    return {
        "mod": mod,
        **qna_json,
        "qid": pdf_question_id,
        "aid": pdf_answer_id,
    }

@qna_router.get("/quiz/{pdf_id}")
async def get_pdf(pdf_id: str):
    try:
        blob = get_storage().download_blob(f"{pdf_id}.pdf")
        return Response(content=blob.readall())
    except ResourceNotFoundError:
        return {
            "message": "Not found",
        }