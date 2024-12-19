package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/idir-44/mt5-data-vis/internal/models"
	"github.com/labstack/echo/v4"
)

func (r controller) getEvents(c echo.Context) error {

	events := models.EventsResponse{}
	client := http.Client{}

	req, err := http.NewRequest("GET", "https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open", nil)
	if err != nil {
		return err
	}

	res, err := client.Do(req)
	if err != nil {
		return err
	}

	defer res.Body.Close()
	err = json.NewDecoder(res.Body).Decode(&events)
	if err != nil {
		return err
	}

	newEvents := []models.Event{}
	geometries := []models.Geometries{}

	for _, ev := range events.Events {
		newEvents = append(newEvents, models.Event{
			EonetID:     ev.ID,
			Title:       ev.Title,
			Description: ev.Description,
			Link:        ev.Link,
			Category:    ev.Categories[0].Title,
		})
		geometries = append(geometries, models.Geometries{
			Date:      ev.Geometries[0].Date,
			Type:      ev.Geometries[0].Type,
			Latitude:  ev.Geometries[0].Coordinates[0],
			Longitude: ev.Geometries[0].Coordinates[1],
		})
	}

	err = r.repository.CreateEvents(newEvents, geometries)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, events)

}
