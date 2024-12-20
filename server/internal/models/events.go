package models

import (
	"time"
)

type EventsResponse struct {
	Title       string
	Description string
	Link        string
	Events      []EventResponse
}

type GeometryResponse struct {
	ID      string
	EventID string
	Date    time.Time
	Type    string

	Coordinates []float64
}

type EventResponse struct {
	ID          string
	EONETID     string
	Title       string
	Description string
	Link        string
	Categories  []CategoryResponse
	Geometries  []GeometryResponse
}

type CategoryResponse struct {
	ID    int64
	Title string
}

type Event struct {
	ID          string
	EonetID     string
	Title       string
	Description string
	Link        string
	Category    string
}

type Geometries struct {
	ID        string
	EventID   string
	Date      time.Time
	Type      string
	Latitude  float64
	Longitude float64
}

type InternalEventResponse struct {
	ID          string
	EonetID     string
	Title       string
	Description string
	Link        string
	Category    string

	Date      time.Time
	Latitude  float64
	Longitude float64
}

type GetEventsRequest struct {
	Category string `query:"category"`
}
