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

func (r repository) GetEvents() ([]models.InternalEventResponse, error) {
	events := []models.InternalEventResponse{}

	query := r.db.NewSelect().ModelTableExpr("events")

	query.Join("INNER JOIN geometries ON geometries.event_id = events.id")

	query.Column("events.id")
	query.Column("eonet_id")
	query.Column("description")
	query.Column("link")
	query.Column("category")
	query.Column("date")
	query.Column("latitude")
	query.Column("longitude")

	err := query.Scan(context.TODO(), &events)

	return events, err
}
