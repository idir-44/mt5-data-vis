package models

import (
	"time"
)

type Events struct {
	Title       string
	Description string
	Link        string
	Events      []Event
}

type Geometry struct {
	ID      string
	EventID string
	Date    time.Time
	Type    string

	Coordinates []float64
}

type Event struct {
	ID          string
	EONETID     string
	Title       string
	Description string
	Link        string
	Categories  []Category
	Category    string
	Geometries  []Geometry
}

type Category struct {
	ID    int64
	Title string
}
