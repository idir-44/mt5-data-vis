package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/idir-44/mt5-data-vis/internal/models"
	"github.com/labstack/echo/v4"
)

func (r controller) getCountriesPopulation(c echo.Context) error {

	populations := []models.PopulationResponse{}
	client := http.Client{}

	req, err := http.NewRequest("GET", "https://restcountries.com/v3.1/all?fields=name,population,latlng", nil)
	if err != nil {
		return err
	}

	res, err := client.Do(req)
	if err != nil {
		return err
	}

	defer res.Body.Close()
	if err := json.NewDecoder(res.Body).Decode(&populations); err != nil {
		return err
	}

	newPopulations := []models.Population{}

	for _, p := range populations {
		newPopulations = append(newPopulations, models.Population{
			CommonName:   p.Name.Common,
			OfficialName: p.Name.Official,
			Latitude:     p.Latlng[0],
			Longitude:    p.Latlng[1],
			Population:   p.Population,
		})
	}

	err = r.repository.CreatePopulations(newPopulations)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, populations)

}

func (r controller) getPopulations(c echo.Context) error {

	query := models.GetPopulationsRequest{}

	if err := c.Bind(&query); err != nil {
		return err
	}

	populations, err := r.repository.GetPopulations(query)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, populations)

}
