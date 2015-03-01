package domain

type Product struct {
	EntityId          int
	AttributeSetId    int
	TypeId            string
	CreatedAt         int
	Name              string
	NewsFromDate      string
	NewsToDate        string
	Price             float32
	ShortDescription  string
	Sku               string
	SmallImage        string
	SpecialFromDate   string
	SpecialPrice      float32
	SpecialToDate     string
	Thumbnail         string
	UrlKey            string
	UrlPath           string
	Visibility        int
	Rank              int
	IsFixedPrice      bool
	Description       string
	Season            int
	SeasonValue       string
	Manufacturer      int
	ManufacturerValue string
	BrandSize         int
	BrandSizeValue    string
	RusSize           int
	RusSizeValue      string
	SizeDescription   string
	Color             string
	Material          string
	FixpriceFlag      bool
	Id1c              int
	SaleFlag          bool
	SppriceFlag       bool
	DiscountPercent   string
	Fashion           string
}

type City struct {
	Id         int    `json:"id"`
	RegionId   int    `json:"region_id"`
	CityName   string `json:"city_name"`
	RegionName string `json:"region_name"`
	Postcode   string `json:"postcode"`
}

type ProductFilter interface{}
type ProductNavigation interface{}

type ProductRepository interface {
	//	FindById(productIds int) Product
	FindByIds(productIds []int) []Product
}

type CitySuggester interface {
	SuggestCities(cityname string) ([]City, error)
}

type ProductSearch interface {
	SearchByCategory(catId int, filter ProductFilter, navigation ProductNavigation) ([]int, int)
	//	SearchByText(query string) []Item
}

type ProductInteractor interface {
	SearchByCategory(catId int, filter ProductFilter, navigation ProductNavigation) ([]Product, int)
}
