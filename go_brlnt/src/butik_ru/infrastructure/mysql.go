package infrastructure

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

//TODO: implement lazy connection
//Set time outs and important params

type MysqlHandler struct {
	*sql.DB
}

func NewMysqlHandler(DSN string) *MysqlHandler {

	conn, err := sql.Open("mysql", DSN)
	if err != nil {
		panic(err.Error())
	}
	h := MysqlHandler{conn}
	return &h
}
