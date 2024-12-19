package models

type PopulationResponse struct {
	Name       Name
	Latlng     []float64
	Population int64
}

type Name struct {
	Common   string
	Official string
}

type Population struct {
	ID           string
	CommonName   string
	OfficialName string
	Latitude     float64
	Longitude    float64
	Population   int64
}

type GetPopulationsRequest struct {
	Gte int64 `query:"gte"`
	Lte int64 `query:"lte"`
}
