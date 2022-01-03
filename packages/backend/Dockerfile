FROM golang:latest 

LABEL base.name="에브리싱글모먼트 NFT api"

WORKDIR /app 

COPY . . 

RUN go build . 

EXPOSE 3002 

ENTRYPOINT [ "./v0" ]