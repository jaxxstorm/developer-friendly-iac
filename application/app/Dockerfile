# Build container
FROM golang:1.15 AS builder

WORKDIR /app
COPY . .
ENV CGO_ENABLED=0
RUN go mod download
RUN go build -o webserver

# Run container
FROM scratch
WORKDIR /app
ENV GIN_MODE=release
COPY --from=builder /app/webserver /app/

CMD [ "/app/webserver" ]
