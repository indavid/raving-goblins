package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	_ "log"
	"net/http"
	"time"
)

func HomeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, " 에브리싱글모먼트 NFT API")
}

func Savenewnft(w http.ResponseWriter, r *http.Request) {
	var NewNft Savenft
	var Result Result
	host := r.Host
	isallowed := Allowthis(host)

	if isallowed {

		db := dbConn()
		reqBody, err := ioutil.ReadAll(r.Body)

		if err != nil {
			fmt.Fprintf(w, "wrong data")

			Result.Error = "wrong data"

		}
		json.Unmarshal(reqBody, &NewNft)
		fmt.Println(NewNft)

		forsale := "yes"

		insForm, err := db.Prepare("INSERT INTO allnfts(ipfsurl,uid,forsale) VALUES(?,?,?)")
		if err != nil {
			panic(err.Error())
		}

		insForm.Exec(NewNft.Ipfsurl, NewNft.UID, forsale)

		Result.Success = "Done successfully"
		Conv, _ := json.MarshalIndent(Result, "", " ")
		fmt.Fprintf(w, "%s", string(Conv))
		defer db.Close()

	} else {

		fmt.Println("not allowed")
		Result.Error = "Request is not allowed"
		Conv, _ := json.MarshalIndent(Result, "", " ")
		fmt.Fprintf(w, "%s", string(Conv))

	}
}

func ChangetoBought(w http.ResponseWriter, r *http.Request) {

	var ErrorR Result
	var BoughtNFT Savenft
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		ErrorR.Error = "bad formatting"

		Conv, _ := json.MarshalIndent(ErrorR, "", " ")

		fmt.Fprintf(w, "%s", string(Conv))
	}

	json.Unmarshal(reqBody, &BoughtNFT)

	db := dbConn()

	host := r.Host

	isallowed := Allowthis(host)

	if isallowed {
		fmt.Println("Data", BoughtNFT)

		currentTime := time.Now()

		fmt.Println("MM-DD-YYYY : ", currentTime.Format("2006-01-02"))

		forsale := "no"

		update, err := db.Prepare("UPDATE allnfts SET forsale=? where uid=?")

		if err != nil {
			fmt.Println(err.Error())

			ErrorR.Error = "error"

			Conv, _ := json.MarshalIndent(ErrorR, "", " ")

			fmt.Fprintf(w, "%s", string(Conv))
		}

		update.Exec(forsale, BoughtNFT.UID)

		ErrorR.Success = "done"

		Conv, _ := json.MarshalIndent(ErrorR, "", " ")

		fmt.Fprintf(w, "%s", string(Conv))

		defer db.Close()

	} else {

		fmt.Println("not allowed")
		ErrorR.Error = "Request is not allowed"
		Conv, _ := json.MarshalIndent(ErrorR, "", " ")
		fmt.Fprintf(w, "%s", string(Conv))
	}
}

func Gettotal(w http.ResponseWriter, r *http.Request) {

	var Dbresult CountAll

	var response []CountAll

	var ErrorR Result

	db := dbConn()

	host := r.Host

	isallowed := Allowthis(host)

	if isallowed {

		var count string
		forsale := "yes"

		err := db.QueryRow("SELECT COUNT(*) FROM allnfts where forsale=?", forsale).Scan(&count)
		if err != nil {
			fmt.Println(err.Error())
			ErrorR.Error = " backend error occured"
			Conv, _ := json.MarshalIndent(ErrorR, "", " ")
			fmt.Fprintf(w, "%s", string(Conv))
			//fmt.Println(err.Error())
		}

		Dbresult.Amount = count

		response = append(response, Dbresult)

		Conv, _ := json.MarshalIndent(response, "", " ")

		fmt.Fprintf(w, "%s", string(Conv))

		defer db.Close()

	} else {

		fmt.Println("not allowed")
		ErrorR.Error = "Request is not allowed"
		Conv, _ := json.MarshalIndent(ErrorR, "", " ")
		fmt.Fprintf(w, "%s", string(Conv))

	}
}

func Getallnfts(w http.ResponseWriter, r *http.Request) {

	var Dbresult Savenft

	var response []Savenft

	var ErrorR Result

	db := dbConn()

	host := r.Host

	isallowed := Allowthis(host)

	if isallowed {

		forsale := "yes"

		selDB, err := db.Query("SELECT * FROM allnfts where forsale=?", forsale)

		if err != nil {
			fmt.Println(err.Error())
			ErrorR.Error = " backend error occured"
			Conv, _ := json.MarshalIndent(ErrorR, "", " ")
			fmt.Fprintf(w, "%s", string(Conv))
			//fmt.Println(err.Error())
		}

		for selDB.Next() {
			var ipfsurl, forsale string
			var id, uid int
			err = selDB.Scan(&id, &ipfsurl, &uid, &forsale)
			if err != nil {
				panic(err.Error())
			}
			Dbresult.Id = id
			Dbresult.Ipfsurl = ipfsurl
			Dbresult.UID = uid
			Dbresult.Forsale = forsale

			response = append(response, Dbresult)
		}

		Conv, _ := json.MarshalIndent(response, "", " ")

		fmt.Fprintf(w, "%s", string(Conv))

		defer db.Close()

	} else {

		fmt.Println("not allowed")
		ErrorR.Error = "Request is not allowed"
		Conv, _ := json.MarshalIndent(ErrorR, "", " ")
		fmt.Fprintf(w, "%s", string(Conv))

	}
}

func Pattern(w http.ResponseWriter, r *http.Request) {
	db := dbConn()

	host := r.Host

	isallowed := Allowthis(host)

	if isallowed {

		defer db.Close()

	} else {

		fmt.Println("not allowed")

	}
}
