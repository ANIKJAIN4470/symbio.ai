from fastapi import APIRouter
from app.api.v1.endpoints import admin, analytics, auth, factories, materials, matches, shipments, transactions

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(factories.router, prefix="/factories", tags=["factories"])
api_router.include_router(materials.router, prefix="/materials", tags=["materials"])
api_router.include_router(matches.router, prefix="/matches", tags=["matches"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
api_router.include_router(shipments.router, prefix="/shipments", tags=["shipments"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
