# #!/bin/bash

USER=$USER
PASS=$PASS

DBNAME=$DBNAME

# install mysql
apt update
apt install mysql-server -y




sudo systemctl start mysql.service
sudo systemctl status mysql.service

sudo mysql -uroot -p$PASS -e "CREATE USER '$USER'@'192.168.56.10' IDENTIFIED BY '$PASS';"
sudo mysql -uroot -p$PASS -e "GRANT ALL PRIVILEGES ON $DBNAME.* to '$USER'@'192.168.56.10';"


sudo mysql -u$USER -p$PASS -e "CREATE DATABASE $DBNAME;"

# sudo mysql -uroot -p$2 -e "USE local_profiles;"

sudo mysql -u$USER -p$PASS -e "USE $DBNAME; CREATE TABLE profiles (
    id INT NOT NULL AUTO_INCREMENT,
    pdf BLOB NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    keywords JSON NOT NULL,
    PRIMARY KEY (ID)
);"

# update mysql conf file to allow remote access to the db
sudo sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo service mysql restart y

