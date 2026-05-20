from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate
from app.auth.jwt_handler import verify_token

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE TASK
@router.post("/")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    user_data: dict = Depends(verify_token)
):

    user = db.query(User).filter(
        User.email == user_data["sub"]
    ).first()

    new_task = Task(
        title=task.title,
        description=task.description,
        owner_id=user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "message": "Task created successfully",
        "task": new_task
    }


# GET USER TASKS
@router.get("/")
def get_tasks(
    db: Session = Depends(get_db),
    user_data: dict = Depends(verify_token)
):

    user = db.query(User).filter(
        User.email == user_data["sub"]
    ).first()

    tasks = db.query(Task).filter(
        Task.owner_id == user.id
    ).all()

    return tasks


# UPDATE TASK
@router.put("/{task_id}")
def update_task(
    task_id: int,
    updated_task: TaskCreate,
    db: Session = Depends(get_db),
    user_data: dict = Depends(verify_token)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = updated_task.title
    task.description = updated_task.description

    db.commit()

    return {
        "message": "Task updated successfully"
    }


# DELETE TASK
@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user_data: dict = Depends(verify_token)
):

    if user_data["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can delete tasks"
        )

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully"
    }