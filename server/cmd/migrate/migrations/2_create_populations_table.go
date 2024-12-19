package migrations

import (
	"context"
	"fmt"

	"github.com/uptrace/bun"
)

func init() {

	up := []string{`
	CREATE TABLE populations (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    common_name VARCHAR(255),
    official_name TEXT,
    latitude FLOAT,
    longitude FLOAT,
    population INT 
  );

	`}

	down := []string{`
			DROP TABLE IF EXISTS populations CASCADE;
	`}

	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print("create populations table")
		for _, q := range up {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print("drop populations table")
		for _, q := range down {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
