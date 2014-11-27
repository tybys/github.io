package main

import (
	. "launchpad.net/gocheck"

	"butik_ru/infrastructure"
	//"butik_ru/interfaces"
	"butik_ru/interfaces/web"
	//"butik_ru/usecases"
	"testing"
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type IntegrationSuite struct {
	h *web.WebHandler
}

var _ = Suite(&IntegrationSuite{})

func (s *IntegrationSuite) SetUpSuite(c *C) {
	config := infrastructure.NewDummyConfig()

	s.h = NewWebApplication(config)
}

func (s *IntegrationSuite) TestNewWebHandler(c *C) {
	c.Check(s.h, Not(IsNil))
}

func (s *IntegrationSuite) TestCitySuggest(c *C) {
	web.TestMoscowSuggest(s.h, c)
	web.TestTwoWordsSuggest(s.h, c)
}

func (s *IntegrationSuite) TestCatalogProduct(c *C) {
	web.TestTwoWordsSuggest(s.h, c)
	web.TestGetCategoryProducts(s.h, c)
}

func NewTestWebHandler() *web.WebHandler {
	config := infrastructure.NewDummyConfig()
	webHandler := NewWebApplication(config)
	return webHandler
}

func (s *IntegrationSuite) TearDownSuite(c *C) {
	//	s.h.SphinxHandler.Close()
	//s.h.MysqlHandler.Close()
}
