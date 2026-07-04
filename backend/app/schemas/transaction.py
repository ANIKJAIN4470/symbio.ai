from pydantic import BaseModel


class TransactionBase(BaseModel):
    material_id: str
    partner_name: str
    amount: float
    status: str = "Pending"


class TransactionCreate(TransactionBase):
    pass


class TransactionOut(TransactionBase):
    id: str

    class Config:
        from_attributes = True
