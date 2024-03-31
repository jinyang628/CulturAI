from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.types.generate_riddle import GenerateRiddleResponse

from app.types.attractions import Attraction
from app.api.generate_riddle import send_riddle_request

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

    
@app.post("/api/generate_riddle") 
async def post_message(attraction: Attraction): 
    response: GenerateRiddleRespone = await send_riddle_request(location=attraction.name)
    return response["result"]