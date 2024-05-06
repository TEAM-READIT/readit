from fastapi import FastAPI
from routers.news_router import router

app = FastAPI()
app.include_router(router)
