package web

import (
	"github.com/simonz05/godis/redis"
	"github.com/yvasiyarov/php_session_decoder"
	"log"
	"net/http"
)

func ReadSession(w http.ResponseWriter, req *http.Request, context *RequestContext) {
	redis := redis.New("tcp:web-d11.butik.ru:6379", 0, "")
	defer redis.Quit()

	if sessionId, err := req.Cookie("frontend"); err == nil {
		if sessionData, err := redis.Get("PHPREDIS_SESSION:" + sessionId.Value); err == nil {
			decoder := php_session_decoder.NewPhpDecoder(sessionData.String())
			if result, err := decoder.Decode(); err == nil {
				for k, _ := range result {
					log.Printf("key: %#v \n", k)
					w.Write([]byte(k))
				}
			} else {
				log.Printf("Can not decode session %v \n", err)
			}
		} else {
			log.Printf("Can not load session from redis: %v \n", sessionData.String())
		}
	} else {
		log.Printf("Can not get session cookie\n")
	}
}
