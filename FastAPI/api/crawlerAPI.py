from fastapi import FastAPI, HTTPException
from pydantic import HttpUrl
from models.news import fetch_news_data
from schemas.schemas import NewsResponse
from crawler.articlecrawler import ArticleCrawler

app = FastAPI()
@app.get("/fetch/link", response_model=NewsResponse)
def fetch_news(url: HttpUrl):
    return fetch_news_data(url)

@app.post("/start/crawler")
def start_crawler():
    crawler = ArticleCrawler()
    crawler.set_category("정치")
    crawler.set_date_range('2023-01-02', '2023-01-02')
    crawler.start()
    return {"mssage": "Crawler started"}
