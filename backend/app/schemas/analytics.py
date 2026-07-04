from pydantic import BaseModel


class AnalyticsOut(BaseModel):
    revenue_generated: float
    co2_avoided: float
    landfill_diversion: float
    active_matches: float

    class Config:
        from_attributes = True
