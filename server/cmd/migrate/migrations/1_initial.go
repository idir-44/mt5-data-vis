package migrations

import (
	"context"
	"fmt"

	"github.com/uptrace/bun"
)

func init() {

	up := []string{`
		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


	CREATE TABLE events (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    eonet_id VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    link TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL
  );

	CREATE TABLE geometries (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL,
    date TIMESTAMP NOT NULL,
    type VARCHAR(50) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
	);
	`}

	down := []string{`
			DROP TABLE IF EXISTS events CASCADE;
			DROP TABLE IF EXISTS geometries CASCADE;
	`}

	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print("create events and geometries tables")
		for _, q := range up {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print("drop events and geometries tables")
		for _, q := range down {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
