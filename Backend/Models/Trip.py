from pydantic import BaseModel

class User(BaseModel):
    source:str
    place:list
    desciption:str
    friends:list
    date:str
    photos:list
    likes:int
    comments:list
