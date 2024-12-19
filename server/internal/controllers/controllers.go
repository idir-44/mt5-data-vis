package controllers

import (
	"github.com/idir-44/mt5-data-vis/internal/repositories"
	"github.com/idir-44/mt5-data-vis/pkg/server"
)

type controller struct {
	repository repositories.Repository
}

func RegisterHandlers(routerGroup *server.Router, repo repositories.Repository) {
	c := controller{repo}

	routerGroup.GET("/events", c.getEvents)
}
