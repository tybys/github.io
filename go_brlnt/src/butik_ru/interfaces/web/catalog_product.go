package web

import (
	//	"bytes"
	"encoding/json"
	//	"fmt"
	//	"github.com/yunge/gosphinx"
	//"butik_ru/domain"
	"butik_ru/usecases"
	. "launchpad.net/gocheck"
	"log"
	"net/http"
	"net/http/httptest"

	"strconv"
)

//Number of products, matching the criteria and has this attribute equal this value
//option value ID => number of products
type FilterProductCount map[string]int

//Response to ajax/catalog/products request
type CatalogProductResponse struct {

	//attribute_code => attribute data
	FilterAttributes map[string]usecases.FilterAttribute `json:"filterAttributes"`

	//attribute labels
	//Attribute code => attribute labels
	// something like "rus_size": "38 EUR, 39 EUR, 42 RUS"
	FilterLabels map[string]string `json:"filterLabels"`

	//Number of products matching the criteria
	//attrubute_code => count of products for each possible attribute value 
	FilterProductCounts map[string]FilterProductCount `json:"filterProductCounts"`

	//Currently selected attribute values
	FilterValues map[string]interface{} `json:"filterValues"`
}

const PRODUCT_INDEX = "fc"
const PRODUCT_PER_PAGE = 48

var filters []string = []string{"manufacturer", "rus_size", "brand_size", "color", "fashion", "discount_percent"}

func AjaxCategoryProducts(w http.ResponseWriter, req *http.Request, context *RequestContext) {
	req.ParseForm()
	if category_id := req.Form.Get("category_id"); category_id != "" {
		if category_id_int, err := strconv.Atoi(category_id); err != nil {
			log.Printf("Can not convert category_id to int:%v", err)
		} else {
			filter := []usecases.FilterAttribute{}
			navigation := usecases.ProductNavigation{}

			productInteractor := usecases.NewProductInteractor(context.WebHandler.Config)
			defer productInteractor.Close()

			productInteractor.SearchByCategory(category_id_int, filter, navigation)
		}
	} else if queryText := req.Form.Get("q"); queryText != "" {
		//TODO: search by query text
	} else {
		log.Printf("Query or category id must be specified\n")
	}

	/*
		sc := butik_ru.NewSphinxClient(context)
		defer sc.Close()

		req.ParseForm()

		var query string

		addMainQuery(sc, req, query)

		//generate is filter products flag

		//Start build filter queries
		for _, filterCode := range filters {
			addFilterCountQuery(sc, req, query, filterCode)
		}

		//Max price
		addPriceMinMaxQuery(sc, req, query, true)
		//Min price
		addPriceMinMaxQuery(sc, req, query, false)

		if results, err := sc.RunQueries(); err != nil {
			log.Fatalf("Get matching products from sphinx  %s \n", err)
		} else {
			for _, match := range results[0].Matches {
				productId := strconv.Itoa(int(match.DocId))
				fmt.Printf("Product %#v \n", productId)
			}

			//read filters
			i := 1
			for _, filterCode := range filters {
				fmt.Printf("\nRead Filter %#v \n", filterCode)

				for _, match := range results[i].Matches {

					attributeValue, _ := match.AttrValues[0].([]byte)
					attributeCount, _ := match.AttrValues[1].(uint32)
					fmt.Printf("Attribute %s: %d \n", string(attributeValue), attributeCount)
				}
				i++
			}

			maxPrice, _ := results[i].Matches[0].AttrValues[0].(uint32)
			minPrice, _ := results[i+1].Matches[0].AttrValues[0].(uint32)
			fmt.Printf("max price %d \n", maxPrice)
			fmt.Printf("min price %d \n", minPrice)
		}
	*/
}

func NewCatalogProductResponse(req *http.Request) *CatalogProductResponse {
	response := &CatalogProductResponse{}
	response.FilterValues = make(map[string]interface{}, len(filters))

	for _, filterCode := range filters {
		if val := req.Form.Get(filterCode); val != "" {
			response.FilterValues[filterCode] = val
		}
	}
	return response
}

func TestProductJson(c *C) {
	response := &CatalogProductResponse{
		FilterAttributes:    make(map[string]usecases.FilterAttribute, 2),
		FilterLabels:        make(map[string]string, 2),
		FilterProductCounts: make(map[string]FilterProductCount, 2),
		FilterValues:        make(map[string]interface{}, 2),
	}
	response.FilterAttributes["rus_size"] = usecases.FilterAttribute{
		AttributeCode: "rus_size",
		AttributeId:   152,
		FrontendLabel: "Российский размер",
		OptionId:      5714,
		Options:       make(map[string]string, 4),
		Value:         "/165-170",
	}

	response.FilterAttributes["rus_size"].Options["58"] = "42-44"
	response.FilterAttributes["rus_size"].Options["59"] = "40-42"
	response.FilterAttributes["rus_size"].Options["60"] = "46-48"
	response.FilterAttributes["rus_size"].Options["61"] = "44-46"
	if _, err := json.Marshal(response); err != nil {
		c.Errorf("JSON encoding error: %#v\n", err)
	}
}

func TestGetCategoryProducts(handler *WebHandler, c *C) {
	w := httptest.NewRecorder()
	context := NewRequestContext(AjaxCategoryProducts, handler)

	req, err := http.NewRequest("GET", "http://www.butik.ru/gocat/getproducts/?manufacturer=79&category_id=23&price_from=37&price_to=6027&sortField=&sortDirection=", nil)
	if err != nil {
		c.Error(err)
	}
	AjaxCategoryProducts(w, req, context)
}

/*
SELECT (id) as tmp_id, id
FROM `fc`
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4)
ORDER BY `rank` DESC LIMIT 48 OPTION max_matches=100000;

SHOW META;

//is size filter available
SELECT
(id) as tmp_id, id
FROM `fc`
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4)
AND rus_size > 0  LIMIT 1 OPTION max_matches=100000;

SELECT material,
COUNT(*) num FROM `fc` 
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4) 
GROUP BY material   ORDER BY num DESC   LIMIT 0, 100   OPTION
max_matches=100000;

SELECT rus_size, COUNT(*) num FROM `fc` 
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4) 
GROUP BY rus_size   ORDER BY num DESC   LIMIT 0, 100   OPTION
max_matches=100000;

SELECT brand_size, COUNT(*) num FROM `fc` 
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4) 
GROUP BY brand_size   ORDER BY num DESC   LIMIT 0, 100   OPTION
max_matches=100000;

SELECT manufacturer, COUNT(*) num FROM `fc` 
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4) 
GROUP BY manufacturer   ORDER BY num DESC   LIMIT 0, 100   OPTION
max_matches=100000;

SELECT color, COUNT(*) num FROM `fc` 
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4) 
GROUP BY color   ORDER BY num DESC   LIMIT 0, 100   OPTION
max_matches=100000;

SELECT `price` FROM `fc` WHERE 
MATCH('@category_ids_field category_306') and visibility IN (2, 4) ORDER BY
price DESC LIMIT 0, 1 OPTION max_matches=100000;

SELECT `price` FROM `fc`
WHERE  MATCH('@category_ids_field category_306') and visibility IN (2, 4)
ORDER BY price ASC LIMIT 0, 1 OPTION max_matches=100000;

SHOW META
*/
