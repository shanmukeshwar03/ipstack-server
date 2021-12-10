#/bin/bash

echo 'Deploy started...'
rsync -av --exclude='node_modules' --exclude='.git' ../nodejs-ipstack/ ubuntu@152.70.74.152:~/projects/ipstack
ssh ubuntu@152.70.74.152 "cd ~/projects/ipstack && docker-compose up -d --build"
echo 'Deployed!'
