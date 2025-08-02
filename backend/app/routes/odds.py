from fastapi import APIRouter
from app.models.odd import OddEntry
from app.database import db

router = APIRouter()

@router.post("/")
def save_odd(odd: OddEntry):
    db.odds.insert_one(odd.dict())
    return {"message": "Odd saved successfully"}

@router.get("/")
def list_odds():
    return list(db.odds.find({}, {"_id": 0}))
