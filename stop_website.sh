#!/bin/bash
cleanup(){
    rm -rf /app/tmp/*
    exit 0
}

trap cleanup SIGTERM SIGINT

exec "$@"
