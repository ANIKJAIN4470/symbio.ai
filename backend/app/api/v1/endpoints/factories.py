from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.v1.endpoints.auth import get_current_user
from app.db.session import SessionLocal
from app.models.factory import Factory
from app.models.user import User
from app.schemas.common import SuccessResponse
from app.schemas.factory import FactoryCreate, FactoryOut, FactoryUpdate

router = APIRouter()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=SuccessResponse)
def list_factories(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    factories = db.query(Factory).filter(Factory.owner_id == current_user.id).all()
    return {"success": True, "message": "Operation successful", "data": {"factories": [FactoryOut.model_validate(factory).model_dump() for factory in factories]}}


@router.post("", response_model=SuccessResponse)
def create_factory(factory_in: FactoryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    factory = Factory(id=str(uuid4()), owner_id=current_user.id, **factory_in.model_dump())
    db.add(factory)
    db.commit()
    db.refresh(factory)
    return {"success": True, "message": "Operation successful", "data": {"factory": FactoryOut.model_validate(factory).model_dump()}}


@router.put("/{factory_id}", response_model=SuccessResponse)
def update_factory(factory_id: str, factory_in: FactoryUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    factory = db.query(Factory).filter(Factory.id == factory_id).first()
    if not factory:
        raise HTTPException(status_code=404, detail="Factory not found")
    if factory.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    for field, value in factory_in.model_dump(exclude_unset=True).items():
        setattr(factory, field, value)

    db.commit()
    db.refresh(factory)
    return {"success": True, "message": "Operation successful", "data": {"factory": FactoryOut.model_validate(factory).model_dump()}}
