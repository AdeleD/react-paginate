.PHONY: install
install:
	@npm i

.PHONY: test
test:
	@npm test

.PHONY: serve
serve:
	@gulp serve

.PHONY: sample
sample:
	@bower i

.PHONY: dist
dist:
	@gulp dist
