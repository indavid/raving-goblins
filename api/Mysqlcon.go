package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func dbConn() (db *sql.DB) {
	db, err := sql.Open("mysql", "admin:johnraving@tcp(database-1.cluster-cfgoyq6p9ins.ap-northeast-2.rds.amazonaws.com:3306)/ravinggoblings")

	if err != nil {
		panic(err.Error())
	}
	return db
}
