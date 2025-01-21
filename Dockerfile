FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    build-essential \
    vim\
    sudo\
    g++ \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --upgrade pip &&\
    pip install fastapi jinja2 uvicorn docker pydantic

WORKDIR /app
COPY . .

EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
