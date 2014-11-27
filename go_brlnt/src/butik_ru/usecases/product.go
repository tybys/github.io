package usecases

import (
	"butik_ru/domain"
	. "butik_ru/infrastructure"

//	"fmt"
)

type ProductInteractor struct {
	ProductRepository *ProductRepository
	ProductIndex      *ProductIndex
	//Logger            Logger
}

func NewProductInteractor(config Config) *ProductInteractor {
	search := NewProductIndex(config)
	repo := NewProductRepository(config)

	i := &ProductInteractor{
		ProductRepository: repo,
		ProductIndex:      search,
	}
	return i
}

func (interactor *ProductInteractor) SearchByCategory(catId int, filter []FilterAttribute, navigation ProductNavigation) ([]domain.Product, int) {
	productIds, totalFound := interactor.ProductIndex.SearchByCategory(catId, filter, navigation)
	products := interactor.ProductRepository.FindByIds(productIds)

	return products, totalFound
}

func (interactor *ProductInteractor) Close() {
	defer interactor.ProductRepository.Close()
	defer interactor.ProductIndex.Close()
}

//Product attribute which can be used for products filtering in catalog 
type FilterAttribute struct {

	//Magento attribute code
	AttributeCode string `json:"attribute_code"`

	//Magento attribute ID
	AttributeId int `json:"attribute_id"`

	//Attribute label
	FrontendLabel string `json:"frontend_label"`

	//WTF ??
	OptionId int `json:"option_id"`

	//Array of all possible attribute values
	//value_id => value_label
	//Since JSON objects only support strings as keys, use string to store ID
	Options map[string]string `json:"options"`

	//WTF ?
	Value string `json:"value"`
}

type ProductNavigation struct {
	Page          int
	SortField     string
	SortDirection int
}

//mysql repository
type MysqlRepository struct {
	*MysqlHandler
}

type ProductRepository MysqlRepository

func NewProductRepository(config Config) *ProductRepository {
	dsn, _ := config.GetStringValue("mysql_dsn")
	mysql := NewMysqlHandler(dsn)
	return &ProductRepository{mysql}
}

func (rep *ProductRepository) FindByIds(productIds []int) []domain.Product {
	return []domain.Product{}
}

// search
type SphinxIndex struct {
	*SphinxHandler
}

type ProductIndex SphinxIndex

func NewProductIndex(config Config) *ProductIndex {
	host, _ := config.GetStringValue("sphinx_host")
	port, _ := config.GetIntValue("sphinx_port")
	sphinx := NewSphinxHandler(host, port)

	return &ProductIndex{sphinx}
}

func (index *ProductIndex) SearchByCategory(catId int, filter domain.ProductFilter, navigation domain.ProductNavigation) ([]int, int) {
	/*
		var query string

		index.addMainQuery(req, query)

		//generate is filter products flag

		//Start build filter queries
		for _, filterCode := range filters {
			index.addFilterCountQuery(sc, req, query, filterCode)
		}

		//Max price
		index.addPriceMinMaxQuery(sc, req, query, true)
		//Min price
		index.addPriceMinMaxQuery(sc, req, query, false)

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
		}*/

	return []int{}, 0
}

/*
func (index *ProductIndex) addMainQuery(req *http.Request, query string) {
	//just for sure
	index.ResetFilters()
	index.ResetGroupBy()

	index.applyFilters(req, "")

	sortField := req.Form.Get("sortField")
	if sortField == "" {
		sortField = "rank"
	}

	sortDirection := gosphinx.SPH_SORT_ATTR_DESC
	if _sortDirection := req.Form.Get("sortDirection"); _sortDirection == "1" {
		sortDirection = gosphinx.SPH_SORT_ATTR_ASC
	}
	//TODO: SPH_SORT_RELEVANCE for search page
	index.SetSortMode(sortDirection, sortField)

	pageStr := req.Form.Get("page")
	if pageStr == "" {
		pageStr = "1"
	}
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		page = 1
	}
	index.SetLimits((page-1)*PRODUCT_PER_PAGE, PRODUCT_PER_PAGE, gosphinx.MaxMatches, gosphinx.MaxMatches)

	index.AddQuery(query, PRODUCT_INDEX, "Get matching products")
}

func (index *ProductIndex) addFilterCountQuery(req *http.Request, query string, attributeCode string) {
	index.ResetFilters()
	index.ResetGroupBy()

	index.applyFilters(req, attributeCode)
	index.SetGroupBy(attributeCode, gosphinx.SPH_GROUPBY_ATTR, "@count desc")
	index.SetSelect(fmt.Sprintf("%s, COUNT(*) as num", attributeCode))

	index.SetLimits(0, 100, gosphinx.MaxMatches, gosphinx.MaxMatches)
	index.AddQuery(query, PRODUCT_INDEX, "Get filters count")
}

func (index *ProductIndex) addPriceMinMaxQuery(req *http.Request, query string, isMaxQuery bool) {
	index.ResetFilters()
	index.ResetGroupBy()

	index.applyFilters(req, "price")
	index.SetSelect("price")
	if isMaxQuery {
		index.SetSortMode(gosphinx.SPH_SORT_ATTR_DESC, "price")
	} else {
		index.SetSortMode(gosphinx.SPH_SORT_ATTR_ASC, "price")
	}
	//	sc.SetLimits(0, 1, gosphinx.MaxMatches, gosphinx.MaxMatches)

	index.AddQuery(query, PRODUCT_INDEX, "Get max price")
}

func (index *ProductIndex) applyFilters(req *http.Request, exceptFilter string) {
	if exceptFilter != "price" {
		if price_from := req.Form.Get("price_from"); price_from != "" {
			if price_to := req.Form.Get("price_to"); price_to != "" {
				if price_from_int, err := strconv.Atoi(price_from); err == nil {
					if price_to_int, err := strconv.Atoi(price_to); err == nil {
						index.SetFilterRange("price", uint64(price_from_int), uint64(price_to_int), false)
					}
				}
			}
		}
	}

	for _, filterCode := range filters {
		if rawFilterValue := req.Form.Get(filterCode); rawFilterValue != "" && exceptFilter != filterCode {

			values := strings.Split(rawFilterValue, ",")
			valuesInt := make([]uint64, 0, len(values))

			for _, valStr := range values {
				if valInt, err := strconv.Atoi(valStr); err == nil {
					valuesInt = append(valuesInt, uint64(valInt))
				}
			}

			if len(valuesInt) > 0 {
				index.SetFilter(filterCode, valuesInt, false)
			}
		}
	}
}
*/
type Config interface {
	Parse() error
	GetIntValue(key string) (int, bool)
	GetStringValue(key string) (string, bool)
	SetIntValue(key string, val int)
	SetStringValue(key string, val string)
}
