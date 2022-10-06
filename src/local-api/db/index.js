import { Sequelize } from "sequelize";
import { config, testConfig } from "../config/config.js";

let sequelize;


if (process.env.NODE_ENV !== 'test') {

    sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
        dialect: "mysql",
        host: config.HOST,
    })

} else {

    sequelize = new Sequelize(testConfig.DB, testConfig.USER, testConfig.PASSWORD, {
        dialect: "mysql",
        host: testConfig.HOST,
    })
}

// let db;
// if (process.env.NODE_ENV !== 'test') {
//     db = "local_profiles_api"
// } else {
//     db = "test_local_profiles_api"
// }

// const sequelize = new Sequelize(db, config.USER, config.PASSWORD, {
//     dialect: "mysql",
//     host: config.HOST,
// })


export { sequelize };

  // sequelize = new Sequelize(adminConfig.DB, adminConfig.USER, adminConfig.PASSWORD, {
    //     dialect: "mysql",
    //     host: adminConfig.HOST,
    // })