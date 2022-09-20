import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/profileAPI.js";
import { sequelize } from "./db/index.js";
// import LOCAL_API from "../src/data/localAPI.mjs"

const app = express();
const port = process.env.PORT || 3020;

sequelize.sync()
.then(result => {
    console.log(`result: `, result);
})
.catch(err => {
    console.log(`err: `, err)
})

app.use(cors({origin: "*"}))
app.use(bodyParser.json());
app.use("/pdf", router);

app.listen(port, (req, res) => {
    console.log("Server is running on port " + port);
});