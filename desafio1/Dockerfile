FROM golang:latest as builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 go build -ldflags="-s -w"

RUN apt-get update && apt-get install -y wget && apt-get install -y xz-utils

RUN wget https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz \
    && tar -xvf upx-3.96-amd64_linux.tar.xz \
    && rm upx-3.96-amd64_linux.tar.xz

RUN upx-3.96-amd64_linux/upx --brute ./desafio1

FROM scratch

WORKDIR /app

EXPOSE 8000 

COPY --from=builder /app/desafio1 .

ENTRYPOINT [ "./desafio1" ]