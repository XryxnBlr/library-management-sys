from sqlalchemy.orm import Session
from app import models, schemas

# Book CRUD operations
def get_books(db: Session):
    return db.query(models.Book).all()

def create_book(db: Session, book: schemas.BookCreate):
    db_book = models.Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def update_book_availability(db: Session, book_id: int, available: bool):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if db_book:
        db_book.available = available
        db.commit()
        db.refresh(db_book)
    return db_book

def borrow_book(db: Session, book_id: int, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        borrowed_books = user.borrowed_books.split(",") if user.borrowed_books else []
        borrowed_books.append(str(book_id))
        user.borrowed_books = ",".join(borrowed_books)
        db.commit()

def return_book(db: Session, book_id: int, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        borrowed_books = user.borrowed_books.split(",") if user.borrowed_books else []
        if str(book_id) in borrowed_books:
            borrowed_books.remove(str(book_id))
            user.borrowed_books = ",".join(borrowed_books)
            db.commit()

# User CRUD operations
def get_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user