from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    RABBITMQ_URL: str = "pyamqp://guest:guest@localhost:5673//"
    REDIS_URL: str = "redis://localhost:6379/0"


    class Config:
        env_file = ".env"


settings = Settings()