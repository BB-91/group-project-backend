
terraform {
  required_providers {
    mysql = {
        source = "nutmegdevelopment/mysql"
        version = "1.0.2"
    }
  }
}

provider "mysql" {
    endpoint = "localhost:3306"
    username = "root"
    password = "Dallas-1005"
}

resource "mysql_database" "local_profiles_api" {
    name = "local_profiles_api"
}

# provider "mysql" {
#     endpoint = "localhost:3306"
#     username = "admin"
#     password = "Dallas-2022"
# }


resource "mysql_user" "admin" {
  user               = "admin"
  host               = "localhost"
  plaintext_password = "Dallas-2022"
}


resource "mysql_grant" "admin" {
  user       = mysql_user.admin.user
  host       = mysql_user.admin.host
  database   = "local_profiles_api"
  privileges = ["SELECT", "UPDATE", "CREATE", "DELETE"]
}


