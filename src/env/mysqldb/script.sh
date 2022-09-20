# #!/bin/bash

USER=$USER
PASS=$PASS

DBNAME=$DBNAME

# install mysql
apt update
apt install mysql-server -y
sudo systemctl start mysql.service
sudo systemctl status mysql.service


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

# sudo mysql -u$USER -p$PASS -e "USE $DBNAME; CREATE TABLE login_table (
#     username VARCHAR(255),
#     password VARCHAR(255)
# );"


