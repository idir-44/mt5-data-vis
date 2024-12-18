package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/idir-44/mt5-data-vis/internal/models"
	"github.com/labstack/echo/v4"
)

func (r controller) getEvents(c echo.Context) error {

	events := models.Events{}
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

	return c.JSON(http.StatusOK, events)

}
