FROM ubuntu:22.04
WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    vim \
    sudo \
    g++ \
    coreutils\
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --upgrade pip && \
    pip install fastapi jinja2 uvicorn docker pydantic pymongo

COPY . .

RUN usermod -s /sbin/nologin root
RUN groupadd cppgroup && \
    useradd -m -g cppgroup -s /bin/bash cppuser && \
    passwd -l root 


RUN chown cppuser:cppgroup /app
    
RUN chmod 700 /app && \
    chmod 000 /root && \
    chmod 555 /bin /boot /dev /etc /lib /lib32 /lib64 /media /mnt /opt /proc /run /sbin /srv /var

RUN echo "cppuser ALL = (ALL) NOPASSWD: /usr/bin/g++, /bin/chmod, /app/*" >> /etc/sudoers

RUN chmod a-w /root
USER cppuser

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
