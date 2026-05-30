from app.core.redis_client import redis_client


MAX_TRANSACTIONS = 5

WINDOW_SECONDS = 30



def check_transaction_velocity(

        user_id

):


    key = f"user:{user_id}:transactions"


    current_count = redis_client.incr(key)


    if current_count == 1:

        redis_client.expire(
            key,
            WINDOW_SECONDS
        )


    if current_count > MAX_TRANSACTIONS:

        return True


    return False