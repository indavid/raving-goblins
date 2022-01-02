package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func dbConn() (db *sql.DB) {
	db, err := sql.Open("mysql", "admin:sinainday@tcp(ecoservelessdb.cluster-c8gzr5vtvzqe.ap-northeast-2.rds.amazonaws.com:3306)/econft")

	if err != nil {
		panic(err.Error())
	}
	return db
}
