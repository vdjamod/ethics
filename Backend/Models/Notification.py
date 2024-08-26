from pydantic import BaseModel

class Notification(BaseModel):
    name:str="" 
    by:str=""
    details:str=""
    request:bool=False
    trip_id:str=""
    date:str=""
