import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("local_profiles_api", "root", "password", {
    dialect: "mysql",
    host: "192.168.56.20",
});

