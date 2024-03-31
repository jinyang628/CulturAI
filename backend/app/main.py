from fastapi import FastAPI, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.types.generate_riddle import GenerateRiddleResponse
from app.types.validate_image import ValidateImageResponse
from app.types.transform_image import TransformImageResponse
from app.types.get_hint import GetHintResponse
from app.types.attractions import Attraction

from app.api.generate_riddle import send_riddle_request
from app.api.get_hint import send_hint_request
from app.api.validate_image import send_validate_image_request
from app.api.transform_image import send_transform_image_request


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

riddle_dict: dict[str, str] = {}

@app.get("/")
def read_root():
    return {"Hello": "World"}

    
@app.post("/api/generate_riddle") 
async def generate_riddle(attraction: Attraction): 
    response: GenerateRiddleResponse = await send_riddle_request(location=attraction.name)
    riddle: str = response["result"]
    riddle_dict[attraction.name] = riddle
    return riddle

@app.post("/api/get_hint")
async def get_hint(attraction: Attraction):
    response: GetHintResponse = await send_hint_request(location=attraction.name, riddle=riddle_dict[attraction.name])
    return response["result"]

@app.post("/api/validate_image")
async def validate_image(attraction: str = Form(...), image: UploadFile = File(...)):

    # Do something with the attraction and image
    response: ValidateImageResponse = await send_validate_image_request(location=attraction, image=image)
    isCorrectLocation: str = response["result"]
    return isCorrectLocation

@app.post("/api/transform_image")
async def transform_image(style: str = Form(...), image: UploadFile = File(...)):
    response: TransformImageResponse = await send_transform_image_request(style=style, image=image)
    encoded_image: str = response["result"]
    return encoded_image
    
