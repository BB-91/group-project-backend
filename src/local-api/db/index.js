import { Sequelize } from "sequelize";
import { rootconfig, adminconfig, testConfig } from "../config/config.js";
let sequelize;

if (process.env.NODE_ENV !== 'test') {
    // --- release code ------------------------------------------------------------------
    sequelize = new Sequelize(config.DB, rootconfig.USER, rootconfig.PASSWORD, {
        dialect: "mysql",
        host: rootconfig.HOST,
    })
<<<<<<< HEAD
=======

} else {
>>>>>>> d505d53078a9add32aa18a7328f516a76888e6f0

    // sequelize = new Sequelize(adminconfig.DB, adminconfig.USER, adminconfig.PASSWORD, {
    //     dialect: "mysql",
    //     host: adminconfig.HOST,
    // })
    // -----------------------------------------------------------------------------------
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