from fastapi import FastAPI, HTTPException, UploadFile, File, Form
import httpx
from starlette.config import Config

config = Config(".env")

app = FastAPI()

ML_PUBLIC_API_URL = config("ML_PUBLIC_API_URL", cast=str)
FLASK_API_URL = f"{ML_PUBLIC_API_URL}/image_classifier/"

@app.post("/send_validate_image_request/")
async def send_validate_image_request(location: str = Form(...), image: UploadFile = File(...)):
    form_data = {
        "location": location,
        "image": (image.filename, await image.read(), image.content_type)
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(FLASK_API_URL, files=form_data)
            response.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=400, detail=str(e))

    return response.json()