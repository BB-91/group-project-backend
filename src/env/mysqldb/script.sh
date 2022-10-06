# #!/bin/bash

=======
# install mysql -----
sudo apt-get install mysql-server -y
sudo apt autoremove 
sudo apt-get update


sudo systemctl start mysql.service
sudo systemctl status mysql.service

# echo -------------- creating database ------------------
# sudo mysql -u root -e "CREATE DATABASE local_profiles_api;"



# sudo mysql -u root -e "USE local_profiles_api; CREATE TABLE profiles (
#     id INT NOT NULL AUTO_INCREMENT,
#     firstname VARCHAR(255) NOT NULL,
#     lastname VARCHAR(255) NOT NULL,
#     country VARCHAR(255) NOT NULL,
#     city VARCHAR(255) NOT NULL,
#     region VARCHAR(255) NOT NULL,
#     zipcode INT NOT NULL,
#     keywords JSON NOT NULL,
#     s3FileName VARCHAR(255),
#     PRIMARY KEY (id)
# );"

# echo --------------------- mysql started -------------------------
# sudo mysql -u root -e "CREATE USER 'admin'@`localhost` IDENTIFIED BY 'Dallas-2022';"



echo ------------------- admin user created ---------------------
sudo mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'Dallas-1005';"

sudo systemctl restart mysql.service

#terraform
echo ---------------UPDATA--------------------------
sudo apt-get install -y gnupg software-properties-common

echo -----------------GPG Keys-----------------------
wget -O- https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor | \
    sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg

echo ----------------------KEYS----------------------------------
gpg --no-default-keyring \
    --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
    --fingerprint


echo ----------------------ADDING REPO TO SYSTEM---------------------
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    sudo tee /etc/apt/sources.list.d/hashicorp.list

echo -------------------------UPDATING--------------------------
sudo apt update

echo ----------------------INSTALLING TERRAFORM-------------------
sudo apt-get install terraform

echo --------MOVE TO TERRAFORM FOLDER---------------------------
cd /home/ubuntu/src/env/tf-db

echo --------TF Initializing---------------------------
terraform init

echo --------TF Validation---------------------------
terraform validate

echo ----------TF Plan-----------------------------
terraform plan

echo --------TF Apply---------------------------
terraform apply -auto-approve

# echo ----------- Table created --------------------

# sudo mysql -u root -pDallas-1005 -e "GRANT ALL PRIVILEGES ON *local_profiles_api* TO 'admin'@'localhost' WITH GRANT OPTION;"

# update mysql conf file to allow remote access to the db
sudo sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo service mysql restart y
