from app.db.session import Base, engine
from app.models.user import User
from app.models.factory import Factory
from app.models.material import Material
from app.models.match import Match
from app.models.transaction import Transaction
from app.models.analytics import Analytics


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
