import {Sequelize} from "sequelize";
import { sequelize } from "../db/index.js";

// body: {pdf: <obj>, firstName: <str>, lastName: <str>, city: <str>, state: <str>, zipCode: <int>, keywords: <arr?>,}

export const Profile = sequelize.define("profiles", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pdf: {
        // type: Sequelize.JSON,
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
    state: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false, 
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