import requests
from bs4 import BeautifulSoup
from fastapi import HTTPException
from config.ArticleParser import ArticleParser
from schemas.schemas import NewsResponse

def fetch_news_data(url: str) -> NewsResponse:
    try:
        response = requests.get(url)
        response.raise_for_status()  # 네트워크 에러 처리

        soup = BeautifulSoup(response.text, 'html.parser')

        # 제목
        raw_headline = soup.select('div.media_end_head.go_trans > div.media_end_head_title > h2')
        title = ArticleParser.clear_headline(raw_headline[-1].get_text(strip=True).replace('\"', "")) if raw_headline else None

        # 본문
        raw_content = soup.select("article#dic_area")
        content = ArticleParser.clear_content(raw_content[-1].get_text(strip=True).replace('\"', "")) if raw_content else None

        # 기자
        raw_reporter = soup.select("div.media_end_head.go_trans > div.media_end_head_info > div.media_end_head_journalist > a > em.media_end_head_journalist_name")
        if not raw_reporter:
            raw_reporter = soup.select("div.NewsEndMain_comp_article_head__Uqd6M > div.article_head_info > div.NewsEndMain_journalist_wrap__2zOn4 > div > div > a > em")
        reporter = raw_reporter[-1].get_text(strip=True) if raw_reporter else None

        # 카테고리
        raw_category = soup.select_one('.Nlnb_menu_list .Nlist_item._LNB_ITEM.is_active .Nitem_link_menu')
        category = raw_category.get_text(strip=True) if raw_category else None

        return NewsResponse(
            title=title,
            content=content,
            reporter=reporter,
            link=str(url),
            category=category
        )
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"네트워크 문제로 뉴스를 가져오는 데 실패했습니다: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="뉴스를 가져오는데 예상치 못한 문제가 발생했습니다.")
