# Makefile - Landing Page Repo

.PHONY: build-lib dev setup

# 1. Instala todo y prepara el submodulo
setup:
	git submodule update --init --recursive
	npm install
	make -C libcss build

# 2. Compila la librería (usa el Makefile que tú mismo arreglaste)
build-lib:
	make -C libcss build

# 3. Lanza el entorno de desarrollo de la landing
dev: build-lib
	npm run dev