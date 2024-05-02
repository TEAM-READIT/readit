import platform
import calendar
import requests
import re
from time import sleep
from bs4 import BeautifulSoup
from multiprocessing import Process
from exceptions import *
from articleparser import ArticleParser


class ArticleCrawler(object):
    def __init__(self):
        self.categories = {'정치': 100, '경제': 101, '사회': 102, '생활문화': 103, '세계': 104, 'IT과학': 105, '오피니언': 110,
                           'politics': 100, 'economy': 101, 'society': 102, 'living_culture': 103, 'world': 104, 'IT_science': 105, 'opinion': 110}
        self.selected_categories = []
        self.titles = []
        self.reporters = []
        self.contents = []
        self.date = {'start_year': 0, 'start_month': 0, 'start_day' : 0, 'end_year': 0, 'end_month': 0, 'end_day':0}
        self.user_operating_system = str(platform.system())

    def set_category(self, *args):
        for key in args:
            if self.categories.get(key) is None:
                raise InvalidCategory(key)
        self.selected_categories = args

    def set_date_range(self, start_date:str, end_date:str):
        start = list(map(int, start_date.split("-")))
        end = list(map(int, end_date.split("-")))
        
        if len(start) == 1:
            start_year = start[0]
            start_month = 1
            start_day = 1
        elif len(start) == 2:
            start_year, start_month = start
            start_day = 1
        elif len(start) == 3:
            start_year, start_month, start_day = start
        
        if len(end) == 1:
            end_year = end[0]
            end_month = 12
            end_day = 31
        elif len(end) == 2:
            end_year, end_month = end
            end_day = calendar.monthrange(end_year, end_month)[1]
        elif len(end) == 3:
            end_year, end_month, end_day = end

        args = [start_year, start_month, start_day, end_year, end_month, end_day]

        if start_year > end_year:
            raise InvalidYear(start_year, end_year)
        if start_month < 1 or start_month > 12:
            raise InvalidMonth(start_month)
        if end_month < 1 or end_month > 12:
            raise InvalidMonth(end_month)
        if start_day < 1 or calendar.monthrange(start_year, start_month)[1] < start_day:
            raise InvalidDay(start_day)
        if end_day < 1 or calendar.monthrange(end_year, end_month)[1] < end_day:
            raise InvalidDay(end_day)
        if start_year == end_year and start_month > end_month:
            raise OverbalanceMonth(start_month, end_month)
        if start_year == end_year and start_month == end_month and start_day > end_day:
            raise OverbalanceDay(start_day, end_day)

        for key, date in zip(self.date, args):
            self.date[key] = date

    @staticmethod
    def make_news_page_url(category_url, date):
        made_urls = []
        for year in range(date['start_year'], date['end_year'] + 1):
            if date['start_year'] == date['end_year']:
                target_start_month = date['start_month']
                target_end_month = date['end_month']
            else:
                if year == date['start_year']:
                    target_start_month = date['start_month']
                    target_end_month = 12
                elif year == date['end_year']:
                    target_start_month = 1
                    target_end_month = date['end_month']
                else:
                    target_start_month = 1
                    target_end_month = 12

            for month in range(target_start_month, target_end_month + 1):
                if date['start_month'] == date['end_month']:
                    target_start_day = date['start_day']
                    target_end_day = date['end_day']
                else:
                    if year == date['start_year'] and month == date['start_month']:
                        target_start_day = date['start_day']
                        target_end_day = calendar.monthrange(year, month)[1]
                    elif year == date['end_year'] and month == date['end_month']:
                        target_start_day = 1
                        target_end_day = date['end_day']
                    else:
                        target_start_day = 1
                        target_end_day = calendar.monthrange(year, month)[1]

                for day in range(target_start_day, target_end_day + 1):
                    if len(str(month)) == 1:
                        month = "0" + str(month)
                    if len(str(day)) == 1:
                        day = "0" + str(day)
                    url = category_url + str(year) + str(month) + str(day)

                    totalpage = ArticleParser.find_news_totalpage(url + "&page=10000")
                    for page in range(1, totalpage + 1):
                        made_urls.append(url + "&page=" + str(page))
        return made_urls

    @staticmethod
    def get_url_data(url, max_tries=5):
        remaining_tries = int(max_tries)
        while remaining_tries > 0:
            try:
                return requests.get(url, headers={'User-Agent':'Mozilla/5.0'})
            except requests.exceptions:
                sleep(1)
            remaining_tries = remaining_tries - 1
        raise ResponseTimeout()

    def crawling(self, category_name):    
        url_format = f'http://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1={self.categories.get(category_name)}&date='
        target_urls = self.make_news_page_url(url_format, self.date)

        for url in target_urls:
            request = self.get_url_data(url)
            document = BeautifulSoup(request.content, 'html.parser')
            temp_post = document.select('.newsflash_body .type06_headline li dl')
            temp_post.extend(document.select('.newsflash_body .type06 li dl'))
            
            post_urls = []
            for line in temp_post:
                post_urls.append(line.a.get('href'))
            del temp_post

            for content_url in post_urls:
                sleep(0.01)
                request_content = requests.get(content_url)

                try:
                    document_content = BeautifulSoup(request_content.text, 'html.parser')
                except:
                    continue

                try:

                    tag_headline = document_content.select('div.media_end_head.go_trans > div.media_end_head_title > h2')

                    text_headline = ''
                    text_headline = text_headline + ArticleParser.clear_headline(str(tag_headline[-1].find_all(text=True)))

                    if not text_headline:
                        continue

                    tag_content = document_content.select("article#dic_area")
                    text_content = ''
                    text_content = text_content + ArticleParser.clear_content(str(tag_content[-1].find_all(text=True)))
                    
                    if not text_content:
                        continue

                    tag_reporter = document_content.select("div.media_end_head.go_trans > div.media_end_head_info > div.media_end_head_journalist > a > em.media_end_head_journalist_name")
                    if tag_reporter == None:
                        tag_reporter = document_content.select("div.NewsEndMain_comp_article_head__Uqd6M > div.article_head_info > div.NewsEndMain_journalist_wrap__2zOn4 > div > div > a > em")

                    pattern = '<[^>]*>'
                    text_reporter = re.sub(pattern=pattern, repl='', string=str(tag_reporter))

                    if not text_reporter:
                        continue

                    print("==========================================================================================")
                    print(f"제목: {text_headline}")
                    print(f"기자: {text_reporter}")
                    print(f"본문: {text_content}")

                    self.titles.append(text_headline)
                    self.contents.append(text_content)
                    self.reporters.append(text_reporter)

                except Exception as ex:
                    del request_content, document_content
                    pass

    def start(self):
        for category_name in self.selected_categories:
            proc = Process(target=self.crawling, args=(category_name,))
            proc.start()
