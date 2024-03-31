from fastapi import FastAPI, HTTPException
import httpx
from starlette.config import Config

config = Config(".env")

app = FastAPI()

ML_PUBLIC_API_URL = config("ML_PUBLIC_API_URL", cast=str)
FLASK_API_URL = f"{ML_PUBLIC_API_URL}/riddle_generator/"

@app.post("/send_riddle_request/")
async def send_riddle_request(location: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(FLASK_API_URL, json={"location": location})
            response.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=400, detail=str(e))

    return response.json()
