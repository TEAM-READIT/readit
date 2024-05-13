from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import SQLAlchemyError, OperationalError, InterfaceError
from dotenv import load_dotenv
import os

load_dotenv()


DB_URL = f'mysql+pymysql://{os.getenv("DB_USERNAME")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/{os.getenv("DB_NAME")}'
Base = declarative_base()

class EngineConnection:

    def __init__(self):
        try:
            self.engine = create_engine(DB_URL, pool_size=50)
        except InterfaceError as e:
            raise Exception(f"DB URL이 잘못되었습니다 : {e}")
        except OperationalError as e:
            raise Exception(f"DB Connection 실패 : {e}")
        except SQLAlchemyError as e:
            raise Exception(f"DB 엔진 초기화 중 에러가 발생 했습니다 : {e}")


    def create_session(self):
        try:
            Session = sessionmaker(bind=self.engine, autoflush=False)
            session = Session()
            return session
        except SQLAlchemyError as e:
            raise Exception(f"세션 생성 중 에러 발생 : {e}")

    def connection(self):
        try:
            conn = self.engine.connect()
            return conn
        except OperationalError as e:
            raise Exception(f"데이터베이스 연결 오류: {e}")
        except SQLAlchemyError as e:
            raise Exception(f"데이터베이스 연결 중 알 수 없는 오류: {e}")
        finally:
            if conn:
                conn.close()