import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv

load_dotenv()

from model.qna import get_answer, prompt
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
app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static")), name="static")

# root
@app.get("/")
async def root():
    return FileResponse('templates/index.html')

@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse('favicon.ico')

@app.get('/manifest.json', include_in_schema=False)
async def manifest():
    return FileResponse('manifest.json')

if __name__ == '__main__':
    if sys.argv[1] == 'model-test':
        # get_answer("Why does the module chooses Java?")
        prompt()
