from fastapi import APIRouter, Response, Request
from pydantic import BaseModel
from azure.cosmos.cosmos_client import CosmosClient
from azure.storage.blob import ContainerClient
from azure.core.exceptions import ResourceNotFoundError
import os
from .pdf import content_to_pdf
from model.qna2 import prompt
from utils.response_to_json import response_to_json
from users.router import get_user
from uuid import uuid4

qna_router = APIRouter(
    prefix="/qna",
    responses={404: {"description": "Not found" }},
)

def get_container():
    client = CosmosClient(os.environ.get('COSMOS_HOST'), { 'masterKey': os.environ.get('COSMOS_KEY') })
    db = client.get_database_client(os.environ.get('COSMOS_DB_ID'))
    return db.get_container_client('Modules')

def get_quiz_container():
    client = CosmosClient(os.environ.get('COSMOS_HOST'), { 'masterKey': os.environ.get('COSMOS_KEY') })
    db = client.get_database_client(os.environ.get('COSMOS_DB_ID'))
    return db.get_container_client('Quizzes')

def get_storage():
    return ContainerClient(os.environ.get('STORAGE_NAME'), "quiz", credential=os.environ.get("STORAGE_CORR"))

def get_module_storage():
    return ContainerClient(os.environ.get('STORAGE_NAME'), "modules", credential=os.environ.get("STORAGE_CORR"))

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
async def get_qna(mod: str, difficulty: str, request: Request):
    if difficulty not in ("easy", "medium", "hard"):
        return {
            "detail": "Invalid difficulty level",
        }

    numQns = 30
    try:
        blob = get_module_storage().download_blob(f"{mod}.txt")
        content = blob.readall().decode()
    except ResourceNotFoundError:
        return {
            "detail": "Resource not found",
        }
    response = prompt(content, numQns, difficulty)
    response = response[response.find("Questions:"):]
    qna_json = response_to_json(response)

    formatted_response = "\n\n".join(response.split("\n"))
    idx = formatted_response.find("Answer Key:")
    questions = formatted_response[10:idx]
    answers = formatted_response[idx+11:]
    storage = get_storage()
    pdf_question_id = content_to_pdf(questions, mod, "Questions", storage)
    pdf_answer_id = content_to_pdf(answers, mod, "Answers", storage)

    quiz_id = str(uuid4())
    user = get_user(request)
    get_quiz_container().create_item(body={
        "id": quiz_id,
        "mod": mod,
        "difficulty": difficulty,
        **qna_json,
        "qid": pdf_question_id,
        "aid": pdf_answer_id,
        "user": user.username if user is not None else None,
    })

    return {
        "id": quiz_id,
        "mod": mod,
        "difficulty": difficulty,
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

@qna_router.get("/quiz")
async def retrieve_quiz(quiz_id: str):
    items = list(get_quiz_container().query_items(
        query="SELECT * FROM r WHERE r.id=@id",
        parameters=[
            {
                "name": "@id",
                "value": quiz_id,
            },
        ],
        enable_cross_partition_query=True,
    ))
    if len(items) == 0:
        return {
            "message": "Not found",
        }
    
    item = items[0]
    return {
        "id": item["id"],
        "mod": item["mod"],
        "difficulty": item["difficulty"],
        "questions": item["questions"],
        "answers": item["answers"],
        "qid": item["qid"],
        "aid": item["aid"],
    }

@qna_router.get("/user-quizzes")
async def get_user_quizzes(request: Request):
    user = get_user(request)
    if user is None:
        return {
            "message": "Not logged in",
        }
    
    items = list(get_quiz_container().query_items(
        query="SELECT * FROM r WHERE r.user=@user",
        parameters=[
            {
                "name": "@user",
                "value": user.username,
            },
        ],
        enable_cross_partition_query=True,
    ))

    return {
        "quizzes": list(map(
            lambda item: {
                "id": item["id"],
                "mod": item["mod"],
                "difficulty": item["difficulty"],
            },
            items,
        ))
    }
