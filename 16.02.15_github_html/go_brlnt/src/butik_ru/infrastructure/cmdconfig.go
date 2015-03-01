package infrastructure

import (
	"flag"
)

type CmdConfig struct {
	stringValues map[string]string
	intValues    map[string]int
}

func NewCmdConfig() *CmdConfig {
	c := &CmdConfig{
		stringValues: make(map[string]string),
		intValues:    make(map[string]int),
	}
	return c
}

func (config *CmdConfig) Parse() error {
	var mysqlDSN = flag.String("mysql_dsn", "root:root@/magento_butik", "MySQL DSN")

	var sphinxPort = flag.Int("sphinx_port", 9312, "Sphinx port")
	var sphinxHost = flag.String("sphinx_host", "127.0.0.1", "Sphinx host")

	var numCpu = flag.Int("num_cpu", 1, "Number of used CPU")

	var bindingPort = flag.String("binding_port", "9001", "Binding port")
	var bindingHost = flag.String("binding_host", "127.0.0.1", "Binding host")

	var isRootMedia = flag.Int("is_root_media", 1, "Is this daemon runned on the same node as admin area ?")
	var rootMediaUrl = flag.String("root_media_url", "http://admin.butik.ru/", "URL of root media node")
	var rootPath = flag.String("root_path", "", "Site root path")

	flag.Parse()

	config.stringValues["mysql_dsn"] = *mysqlDSN
	config.stringValues["sphinx_host"] = *sphinxHost
	config.intValues["sphinx_port"] = *sphinxPort

	config.intValues["num_cpu"] = *numCpu

	config.stringValues["binding_port"] = *bindingPort
	config.stringValues["binding_host"] = *bindingHost

	config.intValues["is_root_media"] = *isRootMedia
	config.stringValues["root_media_url"] = *rootMediaUrl
	config.stringValues["root_path"] = *rootPath

	return nil
}

func (config *CmdConfig) GetIntValue(key string) (int, bool) {
	val, ok := config.intValues[key]
	return val, ok
}

func (config *CmdConfig) GetStringValue(key string) (string, bool) {
	val, ok := config.stringValues[key]
	return val, ok
}

func (config *CmdConfig) SetIntValue(key string, val int) {
	config.intValues[key] = val
}

func (config *CmdConfig) SetStringValue(key string, val string) {
	config.stringValues[key] = val
}
