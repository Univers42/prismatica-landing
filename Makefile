build-lib:
	$(MAKE) -C app/src/lib/libcss build

dev:
	cd app && npm run dev

setup:
	git submodule update --init --recursive
	cd app && npm install
	$(MAKE) build-lib

.PHONY: build-lib dev setup