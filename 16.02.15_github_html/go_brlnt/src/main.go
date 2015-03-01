package main

import (
	"butik_ru/infrastructure"
	//"butik_ru/interfaces"
	"butik_ru/interfaces/web"
	"butik_ru/usecases"
	"fmt"
	"os"
	"runtime"
	"strings"
)

func NewWebApplication(config usecases.Config) *web.WebHandler {

	if err := config.Parse(); err != nil {
		panic(fmt.Sprintf("Can not parse config: %#v \n", err))
	}

	//dsn, _ := config.GetStringValue("mysql_dsn")
	//mysql := infrastructure.NewMysqlHandler(dsn)

	//	host, _ := config.GetStringValue("sphinx_host")
	//	port, _ := config.GetIntValue("sphinx_port")
	//	sphinx := infrastructure.NewSphinxHandler(host, port)

	//	productInteractor := new(usecases.ProductInteractor)
	//	productInteractor.ProductRepository = interfaces.NewProductRepository(mysql)
	//	productInteractor.ProductSearch = interfaces.NewProductIndex(sphinx)

	webHandler := web.NewWebHandler()
	//	webHandler.ProductInteractor = productInteractor
	webHandler.Config = config
	//webHandler.CitySuggester = interfaces.NewCityIndex(sphinx)
	//webHandler.SphinxHandler = sphinx
	//webHandler.MysqlHandler = mysql

	webHandler.InitRequestHandlers()
	return webHandler
}

func main() {

	config := infrastructure.NewCmdConfig()
	webHandler := NewWebApplication(config)

	if rootPath, _ := config.GetStringValue("root_path"); rootPath == "" {
		if binPath, err := os.Getwd(); err == nil {
			config.SetStringValue("root_path", strings.Replace(binPath, "go/bin/frontend", "", 1))
		}
	}

	num, _ := config.GetIntValue("num_cpu")
	runtime.GOMAXPROCS(num)

	//defer webHandler.SphinxHandler.Close()
	//defer webHandler.MysqlHandler.Close()

	webHandler.Run()
}
