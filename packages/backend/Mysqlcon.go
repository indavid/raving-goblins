package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"os"
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

	db, err := sql.Open("mysql", "b51edeb0349da8:085cc9ae@tcp(us-cdbr-east-05.cleardb.net:3306)/heroku_40e8bc5e67898af")

	if err != nil {
		panic(err.Error())
	}
	return db
}
