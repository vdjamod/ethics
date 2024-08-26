from pydantic import BaseModel,EmailStr

class User(BaseModel):
    name:str =""
    username:str =""
    email:EmailStr =""
    password:str =""
    profile_picture:str =""
    bio:str =""
    website:str =""
    trips:list =[]
    followings:list =[]
    followers:list =[]
    recent_activity:list=[]
    notification:list=[]