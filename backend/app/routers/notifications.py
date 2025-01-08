from fastapi import APIRouter

router = APIRouter()

notifications = []

def add_notification(message):
    notifications.append(message)

@router.get("/")
def get_notifications():
    return {"notifications": notifications}