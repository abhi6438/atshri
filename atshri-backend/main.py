import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from routers.admin import admin_discovery_router, admin_router, auth_router
from routers.public import router as public_router

load_dotenv()

app = FastAPI(title="Atshri Backend", version="0.1.0")

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/")
def health_check():
    return {"ok": True, "service": "atshri-backend"}


app.include_router(public_router)
app.include_router(auth_router)
app.include_router(admin_discovery_router)
app.include_router(admin_router)
