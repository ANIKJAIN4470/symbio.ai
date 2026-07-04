from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.v1.endpoints.auth import get_current_user
from app.db.session import SessionLocal
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.common import SuccessResponse

router = APIRouter()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=SuccessResponse)
def list_shipments(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    transactions = db.query(Transaction).filter(Transaction.status != "Draft").all()
    return {"success": True, "message": "Operation successful", "data": {"shipments": [{"id": txn.id, "partner_name": txn.partner_name, "status": txn.status} for txn in transactions]}}


@router.post("", response_model=SuccessResponse)
def create_shipment(payload: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    transaction_id = payload.get("transaction_id") or str(uuid4())
    return {"success": True, "message": "Operation successful", "data": {"shipment": {"id": transaction_id, "status": "Scheduled"}}}
