from dotenv import load_dotenv

load_dotenv()

from model.qna import get_answer, prompt
import sys
import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from qna.router import qna_router
from upload.router import upload_router
from users.router import auth_router

app = FastAPI()

if os.environ.get("ENV") == "development":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# routers
app.include_router(qna_router)
app.include_router(upload_router)
app.include_router(auth_router)

# static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# root
@app.get("/")
async def root():
    return FileResponse('templates/index.html')

if __name__ == '__main__':
    if sys.argv[1] == 'model-test':
        # get_answer("Why does the module chooses Java?")
        prompt()
