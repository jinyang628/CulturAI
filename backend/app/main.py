from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.types.generate_riddle import GenerateRiddleResponse

from app.types.get_hint import GetHintResponse
from app.types.attractions import Attraction
from app.api.generate_riddle import send_riddle_request
from app.api.get_hint import send_hint_request

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