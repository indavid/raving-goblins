package main

import (
	"fmt"
	_ "fmt"
	"log"
	"net/http"
	_ "time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	//port := os.Getenv("PORT")

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/api", HomeLink)

	router.HandleFunc("/api/savenewnft", Savenewnft).Methods("POST")
	router.HandleFunc("/api/changetobought", ChangetoBought).Methods("POST")
	router.HandleFunc("/api/gettotal", Gettotal).Methods("GET")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("now serving on ", 8080)

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(headers, methods, origins)(router)))

}
