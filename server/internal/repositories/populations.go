package repositories

import (
	"context"

	"github.com/idir-44/mt5-data-vis/internal/models"
)

func (r repository) CreatePopulations(populations []models.Population) error {

	_, err := r.db.NewInsert().Model(&populations).ExcludeColumn("id").Exec(context.TODO())

	return err

}

func (r repository) GetPopulations(req models.GetPopulationsRequest) ([]models.Population, error) {
	populations := []models.Population{}

	query := r.db.NewSelect().Model(&populations)

	if req.Gte != 0 {
		query.Where("population >= ?", req.Gte)
	} else if req.Lte != 0 {
		query.Where("population <= ?", req.Lte)
	}

	err := query.Scan(context.TODO())

	return populations, err

}
