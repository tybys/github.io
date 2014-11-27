package web

import (
	//	"fmt"
	//	"io"
	"butik_ru/domain"
	"butik_ru/infrastructure"
	"butik_ru/usecases"
	"log"
	"net/http"
)

type WebHandler struct {
	ProductInteractor domain.ProductInteractor
	CitySuggester     domain.CitySuggester
	mux               *http.ServeMux
	server            *http.Server
	Config            usecases.Config
	SphinxHandler     *infrastructure.SphinxHandler
	MysqlHandler      *infrastructure.MysqlHandler
}

func NewWebHandler() *WebHandler {
	mux := http.NewServeMux()

	server := &http.Server{
		Handler: mux,
		//ReadTimeout:
		//WriteTimeout
		//MaxHeaderBytes
	}
	context := &WebHandler{
		mux:    mux,
		server: server,
	}
	return context
}

func (webHandler *WebHandler) InitRequestHandlers() {
	webHandler.AddRequestHandler("/ajax/getcities/", AjaxGetCities)
	webHandler.AddRequestHandler("/readsession/", ReadSession)
	webHandler.AddRequestHandler("/media/", MediaFileDownload)
	webHandler.AddRequestHandler("/gocat/getproducts/", AjaxCategoryProducts)

}

func (webHandler *WebHandler) AddRequestHandler(pattern string, fn func(http.ResponseWriter, *http.Request, *RequestContext)) {

	rContext := &RequestContext{
		WebHandler: webHandler,
		handler:    fn,
	}
	webHandler.mux.Handle(pattern, rContext)
}

func (webHandler *WebHandler) Run() {
	host, _ := webHandler.Config.GetStringValue("binding_host")
	port, _ := webHandler.Config.GetStringValue("binding_port")
	webHandler.server.Addr = host + ":" + port
	//webHandler.server.Addr = "127.0.0.1:8000"
	if err := webHandler.server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

type RequestContext struct {
	WebHandler *WebHandler
	handler    func(http.ResponseWriter, *http.Request, *RequestContext)
}

func (context *RequestContext) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	context.handler(w, r, context)
}

func (context *RequestContext) ShowOrder(res http.ResponseWriter, req *http.Request, c *RequestContext) {
	return
}

func NewRequestContext(fn func(http.ResponseWriter, *http.Request, *RequestContext), handler *WebHandler) *RequestContext {
	rContext := &RequestContext{
		WebHandler: handler,
		handler:    fn,
	}
	return rContext
}
