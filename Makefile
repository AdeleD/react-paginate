.PHONY: install
install:
	@npm i

.PHONY: test
test:
	@npm test

.PHONY: serve
serve:
	@gulp serve
