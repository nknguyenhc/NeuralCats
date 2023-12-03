from fastapi import APIRouter, Response
from pydantic import BaseModel
from azure.cosmos.cosmos_client import CosmosClient
from azure.storage.blob import ContainerClient
from azure.core.exceptions import ResourceNotFoundError
import os
from .pdf import content_to_pdf

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
    storage = get_storage()
    questions = """
1. Which term is used to describe a class that stores two variables of different types?

    a. Wrapper class

    b. Parameterized class

    c. Generic class

    d. Lightweight class

2. What is the advantage of using generics in Java?

    a. Improved type safety

    b. Simplified syntax

    c. Enhanced performance

    d. Reduced memory usage

3. How do you declare a generic class in Java?

    a. Using the < and > symbols

    b. Using the extends keyword

    c. Using the implements keyword

    d. Using the generic keyword

4. How can generics help reduce code duplication?

    a. By allowing for implicit type conversions

    b. By enforcing strict type checking

    c. By providing a single class for multiple types

    d. By improving the performance of the code

5. What is a parameterized type?

    a. A class that takes multiple parameters

    b. A type argument passed to a generic class or method

    c. A class that extends from a generic superclass

    d. A type that is bounded by a specific interface

6. How can you specify constraints on a generic type parameter in Java?

    a. Using the ? symbol

    b. Using the super keyword

    c. Using the extends keyword

    d. Using the extends and super keywords
    """
    pdf_question_id = content_to_pdf(questions, mod, "Questions", storage)
    answers = """
1. c

2. a

3. a

4. c

5. b

6. c
    """
    pdf_answer_id = content_to_pdf(answers, mod, "Answers", storage)

    return {
        "mod": mod,
        "questions": [
            {
                "question": "1. Which term is used to describe a class that stores two variables of different types?",
                "options": [
                    "a. Wrapper class",
                    "b. Parameterized class",
                    "c. Generic class",
                    "d. Lightweight class",
                ],
            },
            {
                "question": "2. What is the advantage of using generics in Java?",
                "options": [
                    "a. Improved type safety",
                    "b. Simplified syntax",
                    "c. Enhanced performance",
                    "d. Reduced memory usage",
                ],
            },
            {
                "question": "3. How do you declare a generic class in Java?",
                "options": [
                    "a. Using the < and > symbols",
                    "b. Using the extends keyword",
                    "c. Using the implements keyword",
                    "d. Using the generic keyword",
                ],
            },
        ],
        "answers": [
            "c",
            "a",
            "a",
        ],
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
