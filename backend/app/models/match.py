from sqlalchemy import Column, String, Integer, Float, DateTime, Text
from sqlalchemy.sql import func
from app.db.session import Base


class Match(Base):
    __tablename__ = "matches"

    id = Column(String, primary_key=True, index=True)
    material_id = Column(String, nullable=False)
    partner_name = Column(String, nullable=False)
    symbio_score = Column(Integer, nullable=False)
    distance_km = Column(Float, nullable=False)
    carbon_savings = Column(String, nullable=False)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
