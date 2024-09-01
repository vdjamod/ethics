from datetime import datetime
from typing import List, Union
from fastapi import APIRouter, File,Request, UploadFile
from fastapi.responses import RedirectResponse,JSONResponse
from Config.db import conn  # [import-error]
from bson import ObjectId


TripRouter=APIRouter()


#Get Trip
async def get_tripdata(id):
    data=conn.Ethics.Trip.find_one({"_id":id})
    if data:
        data["_id"]=str(data["_id"]) # type: ignore
    return data


#/:username/trip/:tripid
@TripRouter.get("/API/{username}/trip/{tripid}")
async def get_trip(request:Request):
    params=request.path_params
    tripid=params["tripid"]
    object_id = ObjectId(tripid)
    trip_data=await get_tripdata(object_id)
    return JSONResponse( trip_data)
    

def setup_destination(data):
    form_dict={}
    destination=[] 
    for i in data:
        if "destination" in i:
            destination.append(data[i])
        if "photos"==i:
            continue   
        else:
            form_dict[i]=data[i]
    form_dict["destination"]=destination

    return form_dict

def friends_mention(data,username,tripid):
    mention_list = data["friends"].replace(" ", "").split("@")
    for friend in mention_list:
        if friend :
            frd=conn.Ethics.User.find_one({"username":friend})
            if frd:
                frd["notification"].append(create_notification(username,data,tripid))
                conn.Ethics.User.find_one_and_update({"username":friend},{"$set":{"notification":frd["notification"]}})
    print(mention_list)

def create_notification(username,data,tripid):
    destination_place=""
    for i in data["destination"]:
        destination_place+=i
    friends=data["friends"]
    notification={
        "name":f"@{username} Mentaion in Their Trip",
        "by":username,
        "request":False,
        "details":f"@{username} {friends} Trip for {destination_place} they invite you", 
        "trip_id":tripid,
        "date":datetime.now(),

    }
    return notification

import shutil
import os
import cloudinary
import cloudinary.uploader

cloudinary.config( 
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET")
)



#New Trip
@TripRouter.post("/API/{username}/newtrip")
async def user_newtrip(
    username: str,
    request: Request,
    photos: List[UploadFile] = File(...)
):
    print(photos)
    username=request.path_params["username"]
    data=await request.form()
    trip_data=setup_destination(data)
    trip_data["username"]=username
    photo_filenames = []
    for photo in photos: # type: ignore
        if photo.filename:
            result = cloudinary.uploader.upload(photo.file)
            photo_filenames.append(result['secure_url'])
    trip_data["photos"]=photo_filenames
    trip_data["likes"]=0
    trip_data["comments"]=[]

    trip=conn.Ethics.Trip.insert_one(trip_data)
    user_data=conn.Ethics.User.find_one({"username":username})
    user_data["trips"].append(trip.inserted_id)  # type: ignore
    conn.Ethics.User.update_one({"username":username},{"$set":{"trips":user_data["trips"]}}) # type: ignore
    friends_mention(data,username,trip.inserted_id)
    print(user_data)

    for follower in user_data["followers"]: # type: ignore
        follow=conn.Ethics.User.find_one({"username":follower})
        follow["recent_activity"].append(trip.inserted_id) # type: ignore
        conn.Ethics.User.find_one_and_update({"username":follower},{"$set":{"recent_activity":follow["recent_activity"]}}) # type: ignore

    return RedirectResponse(url=f"http://localhost:5173/hbsolanki/home",status_code=302)

# async def user_newtrip( photos: Union[UploadFile, List[UploadFile], None] = File(None),
#     request: Request):
#     print(photos)
#     username=request.path_params["username"]
#     data=await request.form()
#     print(data)
#     trip_data=setup_destination(data)
#     trip_data["username"]=username
#     print(trip_data)
   
            
    # trip=conn.Ethics.Trip.insert_one(trip_data)
    # user_data=conn.Ethics.User.find_one({"username":username})
    # user_data["trips"].append(trip.inserted_id)  # type: ignore
    # conn.Ethics.User.update_one({"username":username},{"$set":{"trips":user_data["trips"]}}) # type: ignore
    # friends_mention(data,username,trip.inserted_id)
    # print(user_data)

    # for follower in user_data["followers"]: # type: ignore
    #     follow=conn.Ethics.User.find_one({"username":follower})
    #     follow["recent_activity"].append(trip.inserted_id) # type: ignore
    #     conn.Ethics.User.find_one_and_update({"username":follower},{"$set":{"recent_activity":follow["recent_activity"]}}) # type: ignore

    # return RedirectResponse(url=f"http://localhost:5173/hbsolanki/home",status_code=302)
# 
