from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud, database

router = APIRouter()

@router.get("/", response_model=List[schemas.User])
def get_users(db: Session = Depends(database.get_db)):
    return crud.get_users(db)
