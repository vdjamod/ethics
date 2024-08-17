from pydantic import BaseModel

class Trip(BaseModel):
    source:str
    place:list
    desciption:str
    friends:list
    date:str
    photos:list
    likes:int
    comments:list
