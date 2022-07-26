#!/bin/bash

#downloading node and npm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node


#create working directory if it doesn't exist
DIR="/home/ubuntu/server"
if [ -d "$DIR" ]; then
  echo "Directory {$DIR} exists"
else
  echo "Create {$DIR} directory..."
  mkdir $DIR
  echo "Directory {$DIR} created"
fi


