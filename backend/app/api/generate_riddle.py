from fastapi import FastAPI, HTTPException
import httpx
from starlette.config import Config

config = Config(".env")

app = FastAPI()

ML_PUBLIC_API_URL = config("ML_PUBLIC_API_URL", cast=str)
FLASK_API_URL = f"{ML_PUBLIC_API_URL}/riddle_generator/"

@app.post("/send_riddle_request/")
async def send_riddle_request(location: str):
    timeout = httpx.Timeout(20.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.post(FLASK_API_URL, json={"location": location})
        except httpx.ReadTimeout as e:
            print(f"ReadTimeout Error: The server did not send any data in the allotted amount of time.")
            raise HTTPException(status_code=408, detail=str(e))
        except httpx.HTTPError as e:
            print(f"Error occurred: {e.response}")
            raise HTTPException(status_code=400, detail=str(e))

    return response.json()
