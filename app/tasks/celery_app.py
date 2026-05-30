from celery import Celery


celery_app = Celery(

    "sentinel",

    broker="pyamqp://guest:guest@localhost:5673//",

    backend="redis://localhost:6379/0"

)