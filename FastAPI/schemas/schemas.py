from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional

class ArticleBase(BaseModel):
    id: int
    category_id: int
    type: str
    content: str
    title: str
    reporter: str | None = None
    source_url: str | None = None
    has_word: bool
    words: str | None = None
    hit: int
    created_at: datetime
    modified_at: datetime | None = None
    deleted_at: datetime | None = None
    is_deleted: bool

    class Config:
        orm_mode = True

class NewsResponse(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    reporter: Optional[str] = None
    link: HttpUrl
    category: Optional[str] = None
