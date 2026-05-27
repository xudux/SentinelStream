from fastapi import FastAPI


app = FastAPI(
    title="SentinelStream",
    version="1.0"
)


@app.get("/")

def root():

    return {
        "message":
        "SentinelStream Running"
    }


@app.get("/health")

def health():

    return {

        "status":
        "healthy"

    }