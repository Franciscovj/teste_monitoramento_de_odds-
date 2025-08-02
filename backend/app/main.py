from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import odds

app = FastAPI(title="Odds Tracker API")

# Liberar CORS pro React localhost:3000 acessar
origins = [
    "http://localhost:3000",     # Pode manter se quiser
    "http://127.0.0.1:3000",
    "http://localhost:5173",     # ADICIONE ISSO
    "http://127.0.0.1:5173",     # E ESSE TAMBÉM, por precaução
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(odds.router, prefix="/api/odds")
