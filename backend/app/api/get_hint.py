from fastapi import FastAPI, HTTPException
import httpx
from starlette.config import Config

config = Config(".env")

app = FastAPI()

ML_PUBLIC_API_URL = config("ML_PUBLIC_API_URL", cast=str)
FLASK_API_URL = f"{ML_PUBLIC_API_URL}/hint_generator/"

@app.post("/send_hint_request/")
async def send_hint_request(location: str, riddle: str):
    timeout = httpx.Timeout(20.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.post(FLASK_API_URL, json={"location": location, "riddle": riddle})
            response.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=400, detail=str(e))

    return response.json()
