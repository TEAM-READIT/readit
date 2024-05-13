from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP
from db.database import Base
from sqlalchemy.sql import func

class Article(Base):
    __tablename__ = 'article'

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, nullable=False)
    type = Column(String(9), nullable=False)
    content = Column(Text, nullable=False)
    title = Column(String(100), nullable=False)
    reporter = Column(String(10), nullable=True)
    source_url = Column(String(1000), nullable=True)
    has_word = Column(Boolean, default=False, nullable=False)
    words = Column(Text, nullable=True)
    hit = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, default=func.now())
    modified_at = Column(TIMESTAMP, nullable=True, onupdate=func.now())
    deleted_at = Column(TIMESTAMP, nullable=True)
    is_deleted = Column(Boolean, nullable=False, default=False)
