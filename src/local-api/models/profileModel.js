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
        type: Sequelize.BLOB,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false, 
    },    
    city: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    zipCode: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    keywords: {
        type: Sequelize.JSON, // actually an array, but no array datatype in SQL
        allowNull: true,
    },

},
    {
        timestamps: false
    }
)