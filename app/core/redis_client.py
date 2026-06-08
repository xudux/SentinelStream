import redis

from app.core.config import settings

redis_client = redis.from_url(
    settings.REDIS_URL,
    decode_responses=True
)

def set_cache(key, value, expire=300):
    redis_client.set(key, value, ex=expire)

def get_cache(key):
    return redis_client.get(key)

def delete_cache(key):
    redis_client.delete(key)