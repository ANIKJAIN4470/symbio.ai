from pydantic import BaseModel
from typing import Optional


class MaterialBase(BaseModel):
    name: str
    chemical_composition: str
    physical_state: str
    quantity: str
    frequency: str
    certificate: str


class MaterialCreate(MaterialBase):
    pass


class MaterialUpdate(MaterialBase):
    pass


class MaterialOut(MaterialBase):
    id: str
    owner_id: Optional[str] = None
    status: str

    class Config:
        from_attributes = True
