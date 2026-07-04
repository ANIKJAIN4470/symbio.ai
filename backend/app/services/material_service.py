from typing import Any
from uuid import uuid4

from sqlalchemy.orm import Session

from app.models.material import Material


def create_material(db: Session, *, owner_id: str, payload: dict[str, Any]) -> Material:
    material = Material(id=str(uuid4()), owner_id=owner_id, **payload)
    db.add(material)
    db.commit()
    db.refresh(material)
    return material
