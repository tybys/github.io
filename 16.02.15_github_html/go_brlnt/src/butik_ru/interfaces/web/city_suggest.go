package web

import (
	. "butik_ru/domain"
	"butik_ru/usecases"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	//	"testing"
	. "launchpad.net/gocheck"
	"net/url"
)

type citySuggestion map[string][]City

func AjaxGetCities(w http.ResponseWriter, req *http.Request, context *RequestContext) {
	req.ParseForm()

	suggester := usecases.NewCityIndex(context.WebHandler.Config)
	defer suggester.Close()

	if cities, err := suggester.SuggestCities(req.Form.Get("cityname")); err != nil {
		log.Printf("Sphinx query error %#v", err)
		return
	} else {
		response := citySuggestion{"cities": cities}
		if jsonData, err := json.Marshal(response); err != nil {
			log.Printf("JSON encoding error: %#v\n", err)
		} else {
			w.Write(jsonData)
		}
	}
}

func TestMoscowSuggest(handler *WebHandler, c *C) {
	w := httptest.NewRecorder()
	context := NewRequestContext(AjaxGetCities, handler)

	req, err := http.NewRequest("POST", "http://www.butik.ru/ajax/getcities/", nil)
	if err != nil {
		c.Error(err)
	}
	req.Form = url.Values{}
	req.Form.Add("cityname", "Мос")

	AjaxGetCities(w, req, context)
	decodedResp := make(citySuggestion, 1)

	if err := json.Unmarshal(w.Body.Bytes(), &decodedResp); err != nil {
		c.Errorf("JSON encoding error: %#v\n", err)
	} else if cities, ok := decodedResp["cities"]; !ok {
		c.Error("Where is no cities key in response")
	} else if len(cities) < 10 {
		c.Errorf("Where is no suggests %#v", cities)
	}
}

func TestTwoWordsSuggest(handler *WebHandler, c *C) {
	w := httptest.NewRecorder()
	context := NewRequestContext(AjaxGetCities, handler)

	req, err := http.NewRequest("POST", "http://www.butik.ru/ajax/getcities/", nil)
	if err != nil {
		c.Error(err)
	}
	req.Form = url.Values{}
	req.Form.Add("cityname", "Новый У")

	AjaxGetCities(w, req, context)
	decodedResp := make(citySuggestion, 1)

	if err := json.Unmarshal(w.Body.Bytes(), &decodedResp); err != nil {
		c.Errorf("JSON encoding error: %#v\n", err)
	} else if cities, ok := decodedResp["cities"]; !ok {
		c.Error("Where is no cities key in response")
	} else if len(cities) == 0 {
		c.Errorf("Where is no suggests %#v", cities)
	}
}
