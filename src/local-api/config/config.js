import dotenv from "dotenv"

dotenv.config();


// let db;
// let host;
// if (process.env.NODE_ENV === "test") {
//     db = "test_local_profiles_api"
//     host = "localhost" 
// }

// db = "local_profiles_api",
// host = process.env.DB_PATH

    const config = {
        HOST: process.env.DB_PATH,
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD,
        DB: process.env.DB,
        DIALECT: "mysql"
    };
    // const adminConfig = {
    //     HOST: process.env.DB_PATH,
    //     USER: process.env.USER1,
    //     PASSWORD: process.env.PASSWORD1,
    //     DB: process.env.DB,
    //     DIALECT: "mysql"
    // };

    const testConfig = {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "password",
        DB: "test_local_profiles_api",
        DIALECT: "mysql"
    }


export { config, testConfig } ;