APP_DIR = app
LIBCSS_DIR = $(APP_DIR)/src/lib/libcss

build-lib:
	$(MAKE) -C $(LIBCSS_DIR) build

dev:
	cd $(APP_DIR) && npm run dev

setup:
	git submodule update --init --recursive
	cd $(APP_DIR) && npm install && npm prune
	$(MAKE) build-lib

# Migration update
update:
	git submodule update --recursive --remote
	cd $(APP_DIR) && npm install && npm prune
	@echo "Dependencies syncronized."

clean:
	@echo "Cleaning construction artifacts..."
	rm -rf $(LIBCSS_DIR)/dist
	-docker rm -f temp-extractor 2>/dev/null || true

fclean: clean
	@echo "Full clean..."
	rm -rf $(APP_DIR)/node_modules
	# Borra archivos temporales de npm y posibles cachés de Sass
	rm -rf $(APP_DIR)/.sass-cache
	-docker rmi libcss-internal 2>/dev/null || true
	@echo "Todo limpio."

re: fclean setup

.PHONY: build-lib dev setup clean fclean re update