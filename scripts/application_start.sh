#!bin/bash
sudo chmod -R 777 /home/ubuntu/server

#navigate to the directory where the script is located
cd /home/ubuntu/server




#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


#install node modules
npm install

#start node application
node ./bin/www > app.out.log < /dev/null &
