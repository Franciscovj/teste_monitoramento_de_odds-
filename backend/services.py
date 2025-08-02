from datetime import datetime
from models import Event, Market, OddVariation

def get_mocked_events():
    return [
        Event(
            name="Team A vs Team B",
            bookmaker="Bookmaker1",
            markets=[
                Market(
                    name="Match Odds",
                    odds_variations=[
                        OddVariation(timestamp=datetime(2023, 1, 1, 10, 0, 0), odds=1.5),
                        OddVariation(timestamp=datetime(2023, 1, 1, 11, 0, 0), odds=1.6),
                    ]
                ),
                Market(
                    name="BTTS",
                    odds_variations=[
                        OddVariation(timestamp=datetime(2023, 1, 1, 10, 0, 0), odds=1.8),
                        OddVariation(timestamp=datetime(2023, 1, 1, 11, 0, 0), odds=1.9),
                    ]
                ),
            ]
        ),
        Event(
            name="Team C vs Team D",
            bookmaker="Bookmaker2",
            markets=[
                Market(
                    name="Over/Under 2.5 Goals",
                    odds_variations=[
                        OddVariation(timestamp=datetime(2023, 1, 1, 12, 0, 0), odds=2.0),
                        OddVariation(timestamp=datetime(2023, 1, 1, 13, 0, 0), odds=2.1),
                    ]
                ),
            ]
        ),
    ]
