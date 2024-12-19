package repositories

import (
	"context"

	"github.com/idir-44/mt5-data-vis/internal/models"
)

func (r repository) CreateEvents(events []models.Event, geometries []models.Geometries) error {

	_, err := r.db.NewInsert().Model(&events).ExcludeColumn("id").Returning("*").Exec(context.TODO())
	if err != nil {
		return err
	}

	for i, ev := range events {
		geometries[i].EventID = ev.ID
	}

	_, err = r.db.NewInsert().Model(&geometries).ExcludeColumn("id").Returning("*").Exec(context.TODO())

	return err
}
