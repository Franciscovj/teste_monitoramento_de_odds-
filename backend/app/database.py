from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URL", "mongodb://localhost:27017"))
db = client["odds_tracker"]
