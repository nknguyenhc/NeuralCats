from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

qna_router = APIRouter(
    prefix="/qna",
    responses={404: {"description": "Not found"}},
)

@qna_router.get("/")
async def get_qna(mod: str):
    return {
        "mod": mod,
    }

class Info(BaseModel):
    mod: str

@qna_router.post("/")
async def post_qna(info: Info):
    return {
        "info": info,
    }
