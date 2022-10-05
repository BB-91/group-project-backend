# #!/bin/bash

# install mysql
sudo apt-get install mysql-server -y
sudo apt autoremove 
sudo apt-get update


sudo systemctl start mysql.service
sudo systemctl status mysql.service

# sudo mysql -u root -ppassword -e "DROP DATABASE test_local_profiles_api;"

sudo mysql -u root -ppassword -e "CREATE USER 'group1'@'localhost' IDENTIFIED BY 'Dallas1005';"

sudo mysql -u root -ppassword -e "CREATE DATABASE test_local_profiles_api;"

sudo mysql -u root -ppassword -e "GRANT ALL PRIVILEGES ON test_local_profiles_api.* to 'group1';"

# sudo mysql -u root -ppassword -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';"


sudo mysql -u root -ppassword -e "USE test_local_profiles_api; CREATE TABLE profiles (
    id INT NOT NULL AUTO_INCREMENT,
    pdf BLOB NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    keywords JSON NOT NULL,
    s3FileName VARCHAR(255),
    PRIMARY KEY (ID)
);"

# # update mysql conf file to allow remote access to the db
# # sudo sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
# # sudo service mysql restart y