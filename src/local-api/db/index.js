import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("local_profiles_api", "root", "password", {
    dialect: "mysql",
    host: "192.168.56.20",
    // port: 3306
});


// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((err) => {
//         console.log('Unable to connect to the database:', err);
//     });