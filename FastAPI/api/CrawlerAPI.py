from fastapi import FastAPI, HTTPException
from pydantic import HttpUrl
from models.news import fetch_news_data
from schemas.schemas import NewsResponse

app = FastAPI()
@app.get("/fetch/link", response_model=NewsResponse)
def fetch_news(url: HttpUrl):
    return fetch_news_data(url)