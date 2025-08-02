from fastapi import APIRouter
from typing import List
from models import Event
from services import get_mocked_events

router = APIRouter()

@router.get("/events", response_model=List[Event])
def get_events():
    return get_mocked_events()
