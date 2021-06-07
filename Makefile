# Copyright Contributors to the Open Cluster Management project

BABEL_PLUGINS=@babel/plugin-transform-modules-commonjs,dynamic-import-node-babel-7

.PHONY: clean
clean:
	# Must cleanup node_modules AND package-lock.json or dependencies could get corrupt
	rm -rf dist
	rm -rf mdist
	rm -rf node_modules
	-rm package-lock.json
	-rm plugin-kui-addons.tgz

.PHONY: compile-plugin
compile-plugin:
	npm run compile:clean
	npm run compile
	mkdir -p dist
	npx --no-install babel --plugins ${BABEL_PLUGINS} mdist --out-dir dist --ignore '**/*.d.ts','**/*.js.map' --no-copy-ignored

.PHONY: install
install:
	# need to create package-lock file if not found, so use install, not ci
	npm install

.PHONY: package
package:
	npm pack
	mv kui-shell-plugin-kui-addons-0.0.0-semantically-released.tgz plugin-kui-addons.tgz
