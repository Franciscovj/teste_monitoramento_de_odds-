from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict

class OddVariation(BaseModel):
    timestamp: datetime
    odds: float

class Market(BaseModel):
    name: str
    odds_variations: List[OddVariation]

class Event(BaseModel):
    name: str
    bookmaker: str
    markets: List[Market]
