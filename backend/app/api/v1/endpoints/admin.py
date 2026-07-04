from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.v1.endpoints.auth import get_current_user
from app.db.session import SessionLocal
from app.models.factory import Factory
from app.models.user import User, UserRole
from app.schemas.common import SuccessResponse

router = APIRouter()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/users", response_model=SuccessResponse)
def list_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    users = db.query(User).all()
    return {"success": True, "message": "Operation successful", "data": {"users": [{"id": user.id, "email": user.email, "full_name": user.full_name, "role": user.role.value} for user in users]}}


@router.get("/factories", response_model=SuccessResponse)
def list_factories(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    factories = db.query(Factory).all()
    return {"success": True, "message": "Operation successful", "data": {"factories": [{"id": factory.id, "name": factory.name, "industry": factory.industry, "location": factory.location, "verified": factory.verified} for factory in factories]}}


@router.put("/verify-factory/{factory_id}", response_model=SuccessResponse)
def verify_factory(factory_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    factory = db.query(Factory).filter(Factory.id == factory_id).first()
    if not factory:
        raise HTTPException(status_code=404, detail="Factory not found")
    factory.verified = True
    db.commit()
    return {"success": True, "message": "Operation successful", "data": {"factory": {"id": factory.id, "verified": factory.verified}}}
