from fastapi import APIRouter,FastAPI,Request
from fastapi.responses import RedirectResponse
import json
from Config.db import conn  # [import-error]


UserRouter=APIRouter()

# Registration
@UserRouter.post("/registration")
async def user_registration(request:Request):
    form=await request.form()
    formDic=dict(form)
    # print(formDic)
    # return formDic
    conn.Ethics.User.insert_one(formDic)
    return RedirectResponse(url="https://localhost:5173/user" )

#signin
@UserRouter.post("/signin")
async def user_signin(request:Request):
    form=await request.form()
    formDic=dict(form)
    UserData=conn.Ethics.User.find_one({"email":formDic["email"] })
    if UserData["password"]==formDic["password"]: # type: ignore
        return RedirectResponse(url=f"/{UserData['username']}") # type: ignore
    else:
        return "Not -Found"