from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(String, primary_key=True, index=True)
    revenue_generated = Column(Float, default=0.0)
    co2_avoided = Column(Float, default=0.0)
    landfill_diversion = Column(Float, default=0.0)
    active_matches = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
