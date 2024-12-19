package main

import (
	"log"

	"github.com/idir-44/mt5-data-vis/internal/controllers"
	"github.com/idir-44/mt5-data-vis/internal/repositories"
	"github.com/idir-44/mt5-data-vis/pkg/database"
	"github.com/idir-44/mt5-data-vis/pkg/server"
)

func main() {

	srv := server.New(server.Config{Port: 8080})

	db, err := database.Connect()
	if err != nil {
		log.Fatalf("failed to init store: %s", err)
		return
	}
	defer db.Close()

	repo := repositories.NewRepository(db)

	v1 := srv.NewGroup("/v1")

	controllers.RegisterHandlers(v1, repo)

	srv.Run()
}
