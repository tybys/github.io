package usecases

import (
	"butik_ru/domain"
	. "butik_ru/infrastructure"
	"fmt"
)

type CityIndex SphinxIndex

func NewCityIndex(config Config) *CityIndex {
	host, _ := config.GetStringValue("sphinx_host")
	port, _ := config.GetIntValue("sphinx_port")
	sphinx := NewSphinxHandler(host, port)

	sphinx.Open()
	return &CityIndex{sphinx}
}

func (index *CityIndex) SuggestCities(cityname string) ([]domain.City, error) {

	result, err := index.Query(fmt.Sprintf("%s*", cityname), "city", "")
	if err != nil {
		return nil, err
	}
	cities := make([]domain.City, 0, result.Total)

	for _, match := range result.Matches {
		c := domain.City{Id: int(match.DocId)}

		if regionId, ok := (match.AttrValues[1]).(uint32); ok {
			c.RegionId = int(regionId)
		}
		if cityName, ok := (match.AttrValues[2]).([]byte); ok {
			c.CityName = string(cityName)
		}
		if regionName, ok := (match.AttrValues[3]).([]byte); ok {
			c.RegionName = string(regionName)
		}

		cities = append(cities, c)
	}
	return cities, nil
}
