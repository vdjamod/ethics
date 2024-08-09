from pydantic import BaseModel

class User(BaseModel):
    name:str
    email:str
    username:str
    mobile:int
    password:str