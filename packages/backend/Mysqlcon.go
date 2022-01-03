package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func dbConn() (db *sql.DB) {

	error := godotenv.Load()
	if error != nil {
		fmt.Println("Error loading .env file")
	}

	/*username := os.Getenv("USERNAME")
	pwd := os.Getenv("PWD")
	host := os.Getenv("HOST")
	dbname := os.Getenv("DBNAME")
	driver := os.Getenv("DRIVER")

	db, err := sql.Open(driver, username+":"+pwd+"@tcp("+host+":3306)"+"/"+dbname)*/

	db, err := sql.Open("mysql", "b46bd41ba12523:373decd6@tcp(us-cdbr-east-05.cleardb.net:3306)/heroku_2590eb959784116")

	if err != nil {
		panic(err.Error())
	}
	return db
}
