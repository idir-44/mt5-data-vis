package repositories

import (
	"github.com/idir-44/mt5-data-vis/internal/models"
	"github.com/uptrace/bun"
)

type repository struct {
	db *bun.DB
}

func NewRepository(db *bun.DB) Repository {
	return repository{db}
}

type Repository interface {
	CreateEvents(events []models.Event, geometries []models.Geometries) error
	GetEvents() ([]models.InternalEventResponse, error)
	CreatePopulations(populations []models.Population) error
	GetPopulations() ([]models.Population, error)
}
