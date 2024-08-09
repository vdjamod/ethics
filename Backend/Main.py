import uvicorn
from fastapi import FastAPI
from Routes.User import UserRouter

app=FastAPI()

app.include_router(UserRouter)
