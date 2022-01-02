package main

type Savenft struct {
	Id      int    `json:"id"`
	Ipfsurl string `json:"ipfsurl"`
	UID     int    `json:"uid"`
}

type Result struct {
	Error   string `json:"error"`
	Success string `json:"success"`
}

type CountAll struct {
	Amount string `json:"amount"`
}
