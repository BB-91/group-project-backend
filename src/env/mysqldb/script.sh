# #!/bin/bash

<<<<<<< HEAD
# install mysql
sudo apt-get install mysql-server -y
sudo apt autoremove 
sudo apt-get update
=======
# install mysql -----
apt update
apt install mysql-server -y
>>>>>>> 0c52e9ae1fcf96169704b693d30400bb4d52c2e1


sudo systemctl start mysql.service
sudo systemctl status mysql.service

sudo mysql -u root -p password -e "CREATE USER 'root' IDENTIFIED BY 'password';"
sudo mysql -u root -p password -e "GRANT ALL PRIVILEGES ON local_profiles_api.* to 'root';"


sudo mysql -u root -p password -e "CREATE DATABASE local_profiles_api;"

<<<<<<< HEAD
=======
# sudo mysql -uroot -p$2 -e "USE local_profiles;"

>>>>>>> 0c52e9ae1fcf96169704b693d30400bb4d52c2e1
sudo mysql -u root -p password -e "USE local_profiles_api; CREATE TABLE profiles (
    id INT NOT NULL AUTO_INCREMENT,
    pdf BLOB NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    keywords JSON NOT NULL,
    s3FileName VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID)
);"

# update mysql conf file to allow remote access to the db
sudo sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo service mysql restart y
