#!/bin/sh
DIR=__sync
# download latest ens-normalize.js
git clone https://github.com/adraffy/ens-normalize.js $DIR
# replace code files
for FILE in decoder include-ens include-nf lib nf utils; do
	# force esm
	cp -v $DIR/src/$FILE.js src/$FILE.mjs
	# fix import extensions
	sed -i 's/\.js/\.mjs/g' src/$FILE.mjs
done
# replace validation tests
cp -v $DIR/validate/tests.json test/tests.json
# cleanup
rm -rf $DIR