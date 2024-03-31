from pydantic import BaseModel

class GetHintResponse(BaseModel):
    message: str
    result: str