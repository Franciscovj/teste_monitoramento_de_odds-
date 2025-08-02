from fastapi import FastAPI
from routes import router as events_router

app = FastAPI()

app.include_router(events_router, prefix="/api")

@app.get("/")
def read_root():
    return {"Hello": "World"}
