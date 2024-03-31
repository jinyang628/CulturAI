from pydantic import BaseModel

class GenerateRiddleResponse(BaseModel):
    message: str
    result: str