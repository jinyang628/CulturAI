from pydantic import BaseModel

class ValidateImageResponse(BaseModel):
    message: str
    result: str