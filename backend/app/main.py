from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


class Message(BaseModel):
    message: str
    
@app.post("/api/post_message") 
def post_message(message: Message): 
    print(message)
    return message