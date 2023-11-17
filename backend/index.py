from model.qna import get_answer
import sys
from fastapi import FastAPI
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from qna.router import qna_router

app = FastAPI()

# routers
app.include_router(qna_router)

# static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# root
@app.get("/")
async def root():
    return FileResponse('templates/index.html')

if __name__ == '__main__':
    if sys.argv[1] == 'model-test':
        get_answer("How do I create a new knowledge base for custom question answering?")
