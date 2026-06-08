from locust import HttpUser
from locust import task
from locust import between


class SentinelUser(HttpUser):

    wait_time = between(1, 3)

    token = None

    def on_start(self):

        email = "loadtest@test.com"
        password = "password123"

        self.client.post(
            "/auth/register",
            json={
                "name": "Load Test User",
                "email": email,
                "password": password
            }
        )

        response = self.client.post(
            "/auth/login",
            data={
                "username": email,
                "password": password
            }
        )

        if response.status_code == 200:

            self.token = response.json()[
                "access_token"
            ]

    @task(3)
    def send_transaction(self):

        if not self.token:
            return

        self.client.post(
            "/transactions/send",
            json={
                "amount": 10,
                "merchant": "Amazon",
                "location": "India"
            },
            headers={
                "Authorization":
                f"Bearer {self.token}"
            }
        )

    @task(1)
    def dashboard(self):

        self.client.get(
            "/dashboard/recent"
        )