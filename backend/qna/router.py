from fastapi import APIRouter
from pydantic import BaseModel
from azure.cosmos.cosmos_client import CosmosClient
import os

qna_router = APIRouter(
    prefix="/qna",
    responses={404: {"description": "Not found" }},
)

def get_container():
    client = CosmosClient(os.environ.get('COSMOS_HOST'), { 'masterKey': os.environ.get('COSMOS_KEY') })
    db = client.get_database_client(os.environ.get('COSMOS_DB_ID'))
    return db.get_container_client('Modules')

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
async def get_qna(mod: str):
    return {
        "mod": mod,
        "qna": [
            {
                "question": "What are generics and how are they useful?",
                "answer": "Generics are a feature in programming languages, including Java, that allow us to define and work with classes and methods that can operate on different types of data. Generics provide a way to parameterize types, allowing us to create reusable code that can work with different data types without sacrificing type safety.\n\nGenerics are useful for several reasons:\n\n1. Type safety: Generics provide compile-time type checking. By specifying the type parameter for a generic class or method, the compiler can catch type errors before the code is executed, reducing the risk of run-time errors.\n\n2. Code reuse: Generics allow us to write code that can be used with different types of data. This reduces duplication of code and makes our code more modular and reusable.\n\n3. Abstraction: Generics enable us to write more general and abstract code. We can define classes and methods that work with any type that meets certain requirements (such as implementing a certain interface), making our code more flexible and adaptable to different scenarios.\n\nOverall, generics improve code quality, readability, and maintainability by providing a type-safe and flexible way to write reusable code.",
            },
            {
                "question": "What are generic methods?",
                "answer": "Generic methods are methods that are parameterized with a type parameter, just like how generic types are parameterized with type parameters. These type parameters allow the method to operate on different types of data without the need for explicit type casting or duplication of code. Generic methods can be used to create more flexible and reusable code.",
            },
        ],
    }

class Info(BaseModel):
    mod: str

@qna_router.post("/")
async def post_qna(info: Info):
    return {
        "info": info,
    }
