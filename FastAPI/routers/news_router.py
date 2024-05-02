from fastapi import APIRouter, HTTPException
from pydantic import HttpUrl
from models.news import fetch_news_data
from schemas.schemas import NewsResponse

router = APIRouter()

@router.get("/fetch/link", response_model=NewsResponse)
def fetch_news(url: HttpUrl):
    return fetch_news_data(url)
