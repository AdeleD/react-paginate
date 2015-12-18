.PHONY: install
install:
	@npm install

.PHONY: test
test:
	@npm test

.PHONY: sample
sample:
	cd sample && webpack
	node sample/data.js

.PHONY: serve
serve:
	node sample/server.js
