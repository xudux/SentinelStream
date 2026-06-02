from app.core.redis_client import redis_client


MAX_TRANSACTIONS = 5

WINDOW_SECONDS = 30



def check_transaction_velocity(user_id):

    try:

        key = f"user:{user_id}:transactions"

        current_count = redis_client.incr(key)

        if current_count == 1:
            redis_client.expire(
                key,
                WINDOW_SECONDS
            )

        return current_count > MAX_TRANSACTIONS

    except Exception:

        print("Redis unavailable")

        return False