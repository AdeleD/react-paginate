.PHONY: install
install:
	@npm install

.PHONY: test
test:
	@npm test

.PHONY: demo
demo:
	cd demo && npm run demo
	node demo/data.js

.PHONY: serve
serve:
	node demo/server.js
