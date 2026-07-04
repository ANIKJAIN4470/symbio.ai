from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.endpoints.auth import get_current_user
from app.db.session import SessionLocal
from app.models.analytics import Analytics
from app.models.user import User
from app.schemas.common import SuccessResponse
from app.schemas.analytics import AnalyticsOut

router = APIRouter()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/dashboard", response_model=SuccessResponse)
def dashboard_analytics(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> Any:
    analytics = db.query(Analytics).order_by(Analytics.created_at.desc()).first()
    if not analytics:
        analytics = Analytics(
            id="analytics-1",
            revenue_generated=245000,
            co2_avoided=1240,
            landfill_diversion=3820,
            active_matches=42,
        )
        db.add(analytics)
        db.commit()
        db.refresh(analytics)
    return {"success": True, "message": "Operation successful", "data": {"analytics": AnalyticsOut.model_validate(analytics).model_dump()}}
