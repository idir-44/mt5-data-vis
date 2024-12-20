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

	routerGroup.GET("/nasa-events", c.getNasaEvents)
	routerGroup.GET("/countries-population", c.getCountriesPopulation)
	routerGroup.GET("/events", c.getEvents)
	routerGroup.GET("/populations", c.getPopulations)
	routerGroup.GET("/events-categories", c.getEventsCategories)
}
