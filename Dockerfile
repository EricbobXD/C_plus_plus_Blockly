FROM ubuntu:22.04
WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    vim \
    sudo \
    g++ \
    coreutils \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --upgrade pip && \
    pip install fastapi jinja2 uvicorn docker pydantic pymongo

COPY . . 

RUN groupadd cppgroup && \
    useradd -m -g cppgroup -s /bin/bash cppuser && \
    passwd -l root

RUN chown -R cppuser:cppgroup /app/databases
RUN chmod 700 /app
RUN chmod 700 /root

RUN chmod 555 /bin /boot /dev /media /mnt /opt /proc /run /sbin /srv /var
RUN chmod 755 /etc /lib /lib32 /lib64

RUN echo "cppuser ALL=(ALL) NOPASSWD: /usr/bin/g++, /bin/chmod /app/*" >> /etc/sudoers

USER cppuser

CMD ["/bin/bash", "-c", "python3 /app/databases/toolbox.py || true; uvicorn main:app --host 0.0.0.0 --port 8080"]
