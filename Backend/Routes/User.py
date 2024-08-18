from fastapi import APIRouter,Request,Form
from fastapi.responses import RedirectResponse,JSONResponse
from Models.User import User
import json
from Config.db import conn  # [import-error]


UserRouter=APIRouter()

# # Registration
# @UserRouter.post("/registration")
# async def user_registration(name:str=Form(...),email: str = Form(...),username:str=Form(...),password:str=Form(...)):
#     form_data=User(name=name,email=email,username=username,password=password) # type: ignore
#     print(form_data)
#     # form=await request.form()
#     # formDic=dict(form)
#     # print(formDic)
#     # return formDic
#     # conn.Ethics.User.insert_one(formDic)
#     return RedirectResponse(url="http://localhost:5173/user/home" ,status_code=302)

# #signin
# @UserRouter.post("/signin")
# async def user_signin(request:Request):
#     # form=await request.form()
#     # formDic=dict(form)
#     # UserData=conn.Ethics.User.find_one({"email":formDic["email"] })
#     # if UserData["password"]==formDic["password"]: # type: ignore
#     #     return RedirectResponse(url=f"/{UserData['username']}") # type: ignore
#     # else:
#     #     return "Not -Found"

#     return RedirectResponse(url="http://localhost:5173/user/home",status_code=302)

# @UserRouter.post("/signin")
# def redirect_to_google():
#     return RedirectResponse(url="https://www.google.com", status_code=302)


# Registration
@UserRouter.post("/API/registration")
async def user_registration(request:Request):
    form_data=dict(await request.form()) 
    print(form_data)
    conn.Ethics.User.insert_one(form_data)
    return RedirectResponse(url=f"http://localhost:5173/{form_data['username']}/home",status_code=302)

# Signin
@UserRouter.post("/API/signin")
async def user_signin(request:Request):
    form_data=dict(await request.form())
    db_data=conn.Ethics.User.find({"username":form_data["username"]})
    print(db_data)
    if form_data['username']:
        return RedirectResponse(url=f"http://localhost:5173/{form_data['username']}/home",status_code=302)
    else:
        return RedirectResponse(url=f"http://localhost:5173/signin",status_code=302)
    
#:username
@UserRouter.get("/API/{username}")
async def user_data(request:Request):
    username=request.path_params
    print(username)
    user_data=conn.Ethics.User.find(username)
    user_data=list(user_data)[0]
    # user_data["tripp"]={}
    user_data["_id"]=str(user_data["_id"])
    for i in range(len(user_data["trips"])):
        # user_data["tripp"][f'{str(i)}']=await get_tripdata(user_data["trips"][i])
        user_data["trips"][i]=await get_tripdata(user_data["trips"][i])

    print(user_data)
    return JSONResponse(user_data)


#Get Trip
async def get_tripdata(id):
    data=conn.Ethics.Trip.find({"_id":id})
    data=list(data)[0]
    data["_id"]=str(data["_id"]) # type: ignore
    return data


#User Profile Update
@UserRouter.post("/API/{username}/profilesetting")
async def user_profilesetting(request:Request):
    pass


#New Trip
@UserRouter.post("/API/{username}/newtrip")
async def user_newtrip(request:Request):
    username=request.path_params["username"]
    data=await request.form()
    form_dict={}
    destination=[]
    for i in data:
        if "destination" in i:
            destination.append(data[i])
        else:
            form_dict[i]=data[i]
    form_dict["destination"]=destination
            
    trip=conn.Ethics.Trip.insert_one(form_dict)
    user_data=conn.Ethics.User.find({"username":"hbsolanki"})
    # try:
    user_data=list(user_data)[0]
    print(trip.inserted_id)
    print(user_data)
    user_data["trips"].append(trip.inserted_id)
    conn.Ethics.User.update_one({"username":"hbsolanki"},{"$set":{"trips":user_data["trips"]}})
    # except:
    #     print("some error")
    return RedirectResponse(url=f"http://localhost:5173/{username}/home",status_code=302)