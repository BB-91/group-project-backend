import { Sequelize } from "sequelize";
import { config, testConfig } from "../config/config.js";

let sequelize;

if (process.env.NODE_ENV !== 'test') {
    // --- release code ------------------------------------------------------------------
    sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
        dialect: "mysql",
        host: config.HOST,
    })


} else {
    // --- test code ------------------------------------------------------------------
    sequelize = new Sequelize(testConfig.DB, testConfig.USER, testConfig.PASSWORD, {
        dialect: "mysql",
        host: testConfig.HOST,
    })
    // -----------------------------------------------------------------------------------
}


export { sequelize };

  // sequelize = new Sequelize(adminConfig.DB, adminConfig.USER, adminConfig.PASSWORD, {
    //     dialect: "mysql",
    //     host: adminConfig.HOST,
    // })