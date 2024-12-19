package repositories

import (
	"context"

	"github.com/idir-44/mt5-data-vis/internal/models"
)

func (r repository) CreatePopulations(populations []models.Population) error {

	_, err := r.db.NewInsert().Model(&populations).ExcludeColumn("id").Exec(context.TODO())

	return err

}

func (r repository) GetPopulations() ([]models.Population, error) {
	populations := []models.Population{}

	err := r.db.NewSelect().Model(&populations).Scan(context.TODO())

	return populations, err

}
