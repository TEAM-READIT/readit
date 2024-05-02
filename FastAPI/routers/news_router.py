from fastapi import APIRouter, BackgroundTasks
from pydantic import HttpUrl
from models.news import fetch_news_data
from schemas.schemas import NewsResponse
from crawler.articlecrawler import ArticleCrawler
import datetime
from datetime import timedelta
router = APIRouter()

@router.get("/fetch/link", response_model=NewsResponse)
def fetch_news(url: HttpUrl):
    return fetch_news_data(url)

@router.post("/start/crawler")
def start_crawler(background_tasks: BackgroundTasks):
    crawler = ArticleCrawler()
    crawler.set_category("정치", "경제", "사회", "생활문화", "세계", "IT과학", "오피니언")
    today = datetime.date.today()
    yesterday = str(today - timedelta(days=1))
    today = str(today)
    print(today, yesterday)
    crawler.set_date_range(yesterday, today)
    background_tasks(crawler.start())
    return {"mssage": "Crawler started"}