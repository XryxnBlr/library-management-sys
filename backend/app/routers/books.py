from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app import crud, schemas
from app.database import get_db
from app.routers.notifications import add_notification
from typing import List


router = APIRouter()

class BorrowReturnRequest(BaseModel):
    user_id: int

@router.get("/", response_model=List[schemas.Book])
def read_books(db: Session = Depends(get_db)):
    return crud.get_books(db)

@router.post("/", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db, book)

@router.post("/{book_id}/borrow", response_model=schemas.Book)
def borrow_book(book_id: int, request: BorrowReturnRequest, db: Session = Depends(get_db)):
    book = crud.update_book_availability(db, book_id, False)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found or already borrowed")
    crud.borrow_book(db, book_id, request.user_id)
    user = db.query(crud.models.User).filter(crud.models.User.id == request.user_id).first()
    add_notification(f"{user.name} borrowed the book '{book.title}'.")
    return book

@router.post("/{book_id}/return", response_model=schemas.Book)
def return_book(book_id: int, request: BorrowReturnRequest, db: Session = Depends(get_db)):
    user = db.query(crud.models.User).filter(crud.models.User.id == request.user_id).first()
    if not user or str(book_id) not in user.borrowed_books.split(","):
        raise HTTPException(status_code=400, detail="User did not borrow this book")
    book = crud.update_book_availability(db, book_id, True)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found or not borrowed")
    crud.return_book(db, book_id, request.user_id)
    add_notification(f"{user.name} returned the book '{book.title}'.")
    return book
