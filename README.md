# Backend Project API

A full-stack backend internship assignment project built using FastAPI, SQLite, and Vanilla JavaScript.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing

## Role-Based Access
- User Role
- Admin Role
- Admin-only task deletion

## Task Management
- Create Tasks
- View Tasks
- Delete Tasks
- User-specific tasks

## Frontend
- Vanilla JavaScript frontend
- Login/Register UI
- Task Dashboard
- Logout Functionality

## Security
- JWT Token Authentication
- Password Validation
- Input Validation
- Protected Routes

---

# Tech Stack

## Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT
- Passlib

## Frontend
- HTML
- CSS
- Vanilla JavaScript

---

# Project Structure

backend-project/

│

├── app/

│   ├── auth/

│   ├── models/

│   ├── routes/

│   ├── schemas/

│   ├── utils/

│   ├── database.py

│   └── main.py

│

├── frontend/

│   ├── index.html

│   ├── style.css

│   └── script.js

│

├── app.db

├── requirements.txt

└── README.md

---

# Installation

## Clone Repository

```bash
git clone <your-github-link>
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open:

```text
frontend/index.html
```

using Live Server or browser.

---

# API Endpoints

## Authentication

- POST /auth/register
- POST /auth/login

## Tasks

- GET /tasks/
- POST /tasks/
- DELETE /tasks/{task_id}

---

# Scalability Notes

This project follows a modular architecture for scalability.

Possible future improvements:
- PostgreSQL integration
- Docker deployment
- Redis caching
- Microservices architecture
- Load balancing
- CI/CD pipeline

---

# Author

Muskan 