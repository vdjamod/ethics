from pydantic import BaseModel

class User(BaseModel):
    name:str
    username:str
    email:str
    password:str
    profile_picture:str
    bio:str
    website:str
    trips:list
    following:list
    follower:list