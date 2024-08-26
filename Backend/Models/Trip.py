from pydantic import BaseModel

class Trip(BaseModel):
    username:str=""
    source:str=""
    place:list=[]
    desciption:str=""
    friends:list=[]
    date:str=""
    photos:list=[]
    likes:int=0
    comments:list=[]
