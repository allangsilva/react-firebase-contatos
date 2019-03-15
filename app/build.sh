#/bin/bash

yarn build
rm -rf ../public/static
mv build/* ../public
cd ../
firebase deploy --only hosting