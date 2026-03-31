build-lib:
	$(MAKE) -C app/src/lib/libcss build

dev:
	cd app && npm run dev

setup:
	git submodule update --init --recursive
	cd app && npm install
	$(MAKE) build-lib

clean:
	@echo "Limpiando artefactos de construcción..."
	# Borra la carpeta dist generada por Docker
	rm -rf app/src/lib/libcss/dist
	# Intenta borrar el contenedor si se quedó colgado (ignora error si no existe)
	-docker rm -f temp-extractor 2>/dev/null || true

fclean: clean
	@echo "Limpieza profunda (full clean)..."
	# Borra las dependencias de node
	rm -rf app/node_modules
	# Borra la imagen de Docker creada
	-docker rmi libcss-internal 2>/dev/null || true
	# Opcional: Desvincula los submódulos para dejar el repo limpio
	# git submodule deinit -f .
	@echo "Todo limpio."

re: fclean setup

.PHONY: build-lib dev setup clean fclean re