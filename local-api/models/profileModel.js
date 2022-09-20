import {Sequelize} from "sequelize";
import { sequelize } from "../db/index.js";


export const Profile = sequelize.define("profiles", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pdf: {
        type: Sequelize.BLOB
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zipCode: {
        type: Sequelize.STRING
    },
    keywords: {
        type: Sequelize.STRING
    }


},
    {
        timestamps: false
    }
)