# Synk Backend

Backend API built with FastAPI.

## Structure

```txt
backend/
├── app/
│   ├── api/
│   │   ├── router.py
│   │   └── v1/
│   │       ├── router.py
│   │       └── endpoints/
│   │           └── health.py
│   ├── core/
│   │   └── config.py
│   ├── schemas/
│   │   └── health.py
│   └── main.py
└── requirements.txt
```

## Install

```sh
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```sh
uvicorn app.main:app --reload
```

## Health Check

```sh
curl http://127.0.0.1:8000/api/v1/health
```
