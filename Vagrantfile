# Vagrant.configure("2") do |config|
# #   # Provisiing mysqldb
#   config.vm.define "mysqldb" do |mysqldb|
#     mysqldb.vm.box = "generic/ubuntu2010"
#     mysqldb.vm.network "private_network", ip: "192.168.56.20"
#     mysqldb.vm.provider "virtualbox" do |vb|
#       config.vm.synced_folder "src/", "/home/vagrant/env" 
#     end
#     mysqldb.vm.provision "shell", path: "src/env/mysqldb/script.sh"
#   end
# end
#   # Provisioning NodeJS App
#   config.vm.define "nodeapp" do |nodeapp|
#     nodeapp.vm.box = "generic/ubuntu2010"
#     nodeapp.vm.network "private_network", ip: "192.168.56.10"
#     nodeapp.hostsupdater.aliases = ["nology.training"]
#     nodeapp.vm.provider "virtualbox" do |vb|
#       nodeapp.vm.synced_folder "src/env/", "/home/vagrant/env"
#     end
#     nodeapp.vm.provision "shell", inline:"echo 'export DB_PATH=192.168.56.20' >> /etc/profile.d/myvars.sh", run: "always"
#     nodeapp.vm.provision "shell", path: "env/nodeapp/script.sh"
#   end
# end



Vagrant.configure("2") do |config|
  # Provisiing mysqldb
    config.vm.define "mysqldb" do |mysqldb|
      mysqldb.vm.box = "generic/ubuntu2010"
      mysqldb.vm.network "private_network", ip: "192.168.56.20"
      mysqldb.vm.provider "virtualbox" do |vb|
        config.vm.synced_folder "src/env/", "/home/vagrant/env" 
      end
      mysqldb.vm.provision "shell", inline: "echo 'export USER=root' >> /etc/profile.d/myvars.sh", run: "always"
      mysqldb.vm.provision "shell", inline: "echo 'export PASS=password' >> /etc/profile.d/myvars.sh", run: "always"
      mysqldb.vm.provision "shell", inline: "echo 'export DBNAME=local_profiles_api' >> /etc/profile.d/myvars.sh", run: "always"

      mysqldb.vm.provision "shell", path: "src/env/mysqldb/script.sh"
    end
  


  # Provisioning NodeJS App
  config.vm.define "nodeapp" do |nodeapp|
    nodeapp.vm.box = "generic/ubuntu2010"
    nodeapp.vm.network "private_network", ip: "192.168.56.10"
    nodeapp.hostsupdater.aliases = ["nology.training"]
    nodeapp.vm.provider "virtualbox" do |vb|
      nodeapp.vm.synced_folder "src", "/home/vagrant/src"
    end
    nodeapp.vm.provision "shell", inline:"echo 'export DB_PATH=192.168.56.20' >> /etc/profile.d/myvars.sh", run: "always"
    nodeapp.vm.provision "shell", path: "src/env/nodeapp/script.sh"
  end
end