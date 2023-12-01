from fastapi import APIRouter, Response, Request
from .model import User, InvalidUsernameException, UsernameExistsException
from pydantic import BaseModel

auth_router = APIRouter(
    prefix="/user",
    responses={404: {"description": "Not found" }},
)

class AuthenticationForm(BaseModel):
    username: str
    password: str

@auth_router.post('/register')
async def register(form: AuthenticationForm, response: Response):
    try:
        user, token = User.create_user(form.username, form.password)
        response.set_cookie(key="token", value=token)
        return {
            "message": "success",
        }
    except InvalidUsernameException:
        return {
            "message": "Username must be alphanumeric.",
        }
    except UsernameExistsException:
        return {
            "message": "Username already exists."
        }

@auth_router.post('/login')
async def login(form: AuthenticationForm, response: Response):
    user, token = User.authenticate(form.username, form.password)
    if user is None:
        return {
            "message": "Wrong username or password.",
        }
    
    response.set_cookie(key="token", value=token)
    return {
        "message": "success",
    }

def get_user(request: Request):
    token = request.cookies.get('token')
    if token is not None:
        return User.get_user(token)
    else:
        return None

@auth_router.post('/refresh')
async def refresh(request: Request, response: Response):
    user = get_user(request)
    if user is None:
        response.delete_cookie("token")
        return {
            "message": "not logged in",
        }
    
    token = user.refresh()
    response.set_cookie(key="token", value=token)
    return {
        "message": "success",
    }
