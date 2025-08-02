from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class OddEntry(BaseModel):
    timestamp: datetime
    bookmaker: str
    market: str
    odds: dict
    event: str
