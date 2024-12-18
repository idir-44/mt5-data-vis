package controllers

import "github.com/idir-44/mt5-data-vis/pkg/server"

type controller struct {
}

func RegisterHandlers(routerGroup *server.Router) {
	c := controller{}

	routerGroup.GET("/events", c.getEvents)
}
