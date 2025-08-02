from datetime import datetime, timedelta
import random
import json
import uuid

# Lista fixa de jogos com IDs
fixtures = [
    {"fixture_id": 1001, "event": "Time A vs Time B"},
    {"fixture_id": 1002, "event": "Time C vs Time D"},
    {"fixture_id": 1003, "event": "Time E vs Time F"},
]

markets = ["Match Odds", "BTTS", "Over/Under"]
bookmakers = ["Bet365", "Pinnacle", "1xBet"]

def generate_mock_odds(num_entries=10):
    mock_data = []
    base_time = datetime.now()

    for i in range(num_entries):
        fixture = random.choice(fixtures)  # Escolhe um jogo aleatório
        timestamp = base_time - timedelta(minutes=random.randint(1, 300))
        market = random.choice(markets)
        bookmaker = random.choice(bookmakers)
        odds = {
            "home": round(random.uniform(1.5, 3.0), 2),
            "draw": round(random.uniform(2.0, 4.0), 2),
            "away": round(random.uniform(2.0, 4.5), 2)
        }

        mock_data.append({
            "fixture_id": fixture["fixture_id"],
            "event": fixture["event"],
            "timestamp": timestamp.isoformat(),
            "bookmaker": bookmaker,
            "market": market,
            "odds": odds
        })
    
    return mock_data

mock_odds = generate_mock_odds(20)  # 20 registros para melhor variedade
mock_path = "mock_odds.json"

with open(mock_path, "w") as f:
    json.dump(mock_odds, f, indent=2)

print(f"Mock salvo em: {mock_path}")
