#!/bin/bash
echo -------------- Update source list --------------
sudo apt-get update -y

echo -------------- Install Python ------------------
sudo apt-get install software-properties-common -y

echo -------------- Download node v18 ---------------
curl -fsSL https://deb.nodesource.com/setup_16.x  | sudo -E bash -

echo ------------------ Install node ----------------
sudo apt-get install -y nodejs -y

echo ------------------ Install npm -----------------
sudo apt-get install npm -y

echo ------------- Installing Apache ----------------
sudo apt install apache2 -y

echo ------------ Enabling Apache Proxy -------------
sudo a2enmod proxy
sudo a2enmod proxy_http

echo ------- Add nology Apache Proxy File -----------
cp /home/ubuntu/src/env/nodeapp/nodeapp.conf /etc/apache2/sites-available
echo ls -la /etc/apache2/sites-available

echo ------- Register nology Apache Proxy File ------
sudo a2ensite nodeapp.conf

echo -------------- Restart Apache ------------------
sudo systemctl reload apache2

echo --- Add start script to Service Folder ---------
sudo cp /home/ubuntu/src/env/nodeapp/nodeapp.service /etc/systemd/system
ls -la /etc/systemd/system
sudo systemctl daemon-reload

echo --------------- Move into App Folder -----------
cd ../ubuntu/src/local-api
pwd

echo ----------- Install forever --------------------
sudo npm install forever -g

echo -------------- Install Dependancies ------------
npm install --no-bin-links

echo -------------------- Run App -------------------
# node index.js
sudo forever stopall
sudo forever start index.js