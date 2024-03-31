from pydantic import BaseModel

class TransformImageResponse(BaseModel):
    message: str
    result: str