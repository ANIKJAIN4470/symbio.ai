from pydantic import BaseModel
from typing import Any, Dict, List, Optional


class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Dict[str, Any]] = None


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    errors: List[str] = []
