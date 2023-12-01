from azure.cosmos.cosmos_client import CosmosClient
import os
from uuid import uuid4
import hashlib
from datetime import datetime
from copy import copy

class User:
    def __init__(self, username):
        self.username = username

    def get_container():
        client = CosmosClient(os.environ.get('COSMOS_HOST'), { 'masterKey': os.environ.get('COSMOS_KEY') })
        db = client.get_database_client(os.environ.get('COSMOS_DB_ID'))
        return db.get_container_client('Users')
    
    def create_user(username, password):
        container = User.get_container()
        if username == '' or not username.isalnum():
            raise InvalidUsernameException()
        
        items = list(container.query_items(
            query="SELECT * FROM r WHERE r.username=@username",
            parameters=[
                {
                    "name": "@username",
                    "value": username
                }
            ],
            enable_cross_partition_query=True
        ))
        if len(items) > 0:
            raise UsernameExistsException()
        
        token = str(uuid4())
        container.create_item(body={
            "id": str(uuid4()),
            "username": username,
            "password": User.hash_password(password),
            "token": User.hash_password(token),
            "expiry": User.get_next_expiry(),
        })
        return User(username), token
    
    def authenticate(username, password):
        container = User.get_container()
        items = list(container.query_items(
            query="SELECT * FROM r WHERE r.username=@username",
            parameters=[
                {
                    "name": "@username",
                    "value": username
                }
            ],
            enable_cross_partition_query=True
        ))
        if len(items) == 0:
            return None, None
        
        item = items[0]
        if User.hash_password(password) != item["password"]:
            return None, None
        
        token = str(uuid4())
        new_item = copy(item)
        new_item["token"] = User.hash_password(token)
        new_item["expiry"] = User.get_next_expiry()
        container.delete_item(item=item["id"], partition_key=[item["username"], item["token"]])
        container.create_item(body=new_item)
        return User(username), token
    
    def get_next_expiry():
        return datetime.now().timestamp() + 3 * 24 * 3600
    
    def get_user(token):
        items = list(User.get_container().query_items(
            query="SELECT * FROM r WHERE r.token=@token",
            parameters=[
                {
                    "name": "@token",
                    "value": User.hash_password(token)
                }
            ],
            enable_cross_partition_query=True
        ))
        if len(items) == 0:
            return None
        if items[0]["expiry"] < datetime.now().timestamp():
            return None
        
        return User(items[0]["username"])
    
    def hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()
    
    def refresh(self):
        container = User.get_container()
        item = list(container.query_items(
            query="SELECT * FROM r WHERE r.username=@username",
            parameters=[
                {
                    "name": "@username",
                    "value": self.username,
                },
            ],
            enable_cross_partition_query=True,
        ))[0]
        
        token = str(uuid4())
        new_item = copy(item)
        new_item["token"] = User.hash_password(token)
        new_item["expiry"] = User.get_next_expiry()
        container.delete_item(item=item["id"], partition_key=[item["username"], item["token"]])
        container.create_item(body=new_item)
        return token

class InvalidUsernameException(Exception):
    pass 

class UsernameExistsException(Exception):
    pass 
