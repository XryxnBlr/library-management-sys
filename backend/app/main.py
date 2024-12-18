from fastapi import FastAPI
from app.routers import books, users, notifications
from app.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Library Management System",
    description="Backend for the Library Management System",
    version="1.0.0"
)

# Include routers
app.include_router(books.router, prefix="/books", tags=["Books"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Library Management System API"}