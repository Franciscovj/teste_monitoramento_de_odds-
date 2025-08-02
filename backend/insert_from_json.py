from app.database import db  # Ajuste o import conforme seu projeto
import json
from datetime import datetime

with open("mock_odds.json", "r") as f:
    data = json.load(f)

for record in data:
    record["timestamp"] = datetime.fromisoformat(record["timestamp"])
    db.odds.insert_one(record)

print(f"{len(data)} registros inseridos no MongoDB!")
