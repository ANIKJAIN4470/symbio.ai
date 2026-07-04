from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.v1.endpoints.auth import get_current_user
from app.db.session import SessionLocal
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.common import SuccessResponse
from app.schemas.transaction import TransactionCreate, TransactionOut

router = APIRouter()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=SuccessResponse)
def list_transactions(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    transactions = db.query(Transaction).all()
    return {"success": True, "message": "Operation successful", "data": {"transactions": [TransactionOut.model_validate(transaction).model_dump() for transaction in transactions]}}


@router.post("", response_model=SuccessResponse)
def create_transaction(transaction_in: TransactionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    transaction = Transaction(id=str(uuid4()), **transaction_in.model_dump())
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return {"success": True, "message": "Operation successful", "data": {"transaction": TransactionOut.model_validate(transaction).model_dump()}}


@router.get("/{transaction_id}", response_model=SuccessResponse)
def get_transaction(transaction_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"success": True, "message": "Operation successful", "data": {"transaction": TransactionOut.model_validate(transaction).model_dump()}}
