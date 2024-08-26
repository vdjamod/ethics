import uvicorn
from fastapi import FastAPI
from Routes.User import UserRouter
from Routes.Trip import TripRouter

app=FastAPI()

app.include_router(UserRouter)
app.include_router(TripRouter)

