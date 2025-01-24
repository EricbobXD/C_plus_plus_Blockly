FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    build-essential \
    vim\
    g++ \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --upgrade pip &&\
    pip install fastapi jinja2 uvicorn docker pydantic

RUN useradd -m user1
RUN usermod -s /sbin/nologin root

USER nobody 
#限制資源使用
ENV PYTHONUNBUFFERED=1
ENV GUNICORN_CMD_ARGS="--workers 1 --threads 4"

WORKDIR /app
COPY . .

EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
