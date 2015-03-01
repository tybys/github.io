package infrastructure

type DummyConfig struct {
	*CmdConfig
}

func NewDummyConfig() *DummyConfig {
	c := &DummyConfig{NewCmdConfig()}

	return c
}

func (config *DummyConfig) Parse() error {
	config.SetStringValue("sphinx_host", "127.0.0.1")
	config.SetIntValue("sphinx_port", 9312)
	config.SetStringValue("mysql_dsn", "root:root@/magento_butik")
	return nil
}
