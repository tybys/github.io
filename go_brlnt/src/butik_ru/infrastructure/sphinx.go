package infrastructure

import (
	"fmt"
	"github.com/yunge/sphinx"
)

//TODO: implement lazy connection
//Set time outs and important params
type SphinxHandler struct {
	*sphinx.Client
}

func NewSphinxHandler(host string, port int) *SphinxHandler {

	opts := &sphinx.Options{
		Host:       host,
		Port:       port,
		Timeout:    500,
		MaxMatches: 100000,
		RetryCount: 3,
		RetryDelay: 1,
	}

	sc := sphinx.NewClient(opts).SetServer(host, port)
	/*
	 */

	return &SphinxHandler{sc}
}

func (sh *SphinxHandler) Open() {
	if err := sh.Client.Open(); err != nil {
		panic(fmt.Sprintf("Can not connect to sphinx: %#v \n", err))
	}
}
