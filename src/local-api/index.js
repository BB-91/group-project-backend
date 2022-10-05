import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/profileAPI.js";
import { sequelize } from "./db/index.js";
import LOCAL_API from "../data/localAPI.mjs"

const app = express();
const port = process.env.PORT || 3010;


const connect = () => {

    sequelize.sync()
.then(result => {
    console.log(`result: `, result);
})
.catch(err => {
    console.log(`err: `, err)
})
}

console.log("connecting in 50 seconds......")
console.log(process.env.NODE_ENV)
<<<<<<< HEAD
setTimeout(connect, 50000);
=======
setTimeout(connect, delayTime);
>>>>>>> 0c52e9ae1fcf96169704b693d30400bb4d52c2e1

// sequelize.sync()
// .then(result => {
//     console.log(`result: `, result);
// })
// .catch(err => {
//     console.log(`err: `, err)
// })

// app.use(cors({origin: "http://localhost:3000"}));
app.use(cors({origin: `*`}));
app.use(bodyParser.json());
app.use(LOCAL_API.PATH, router);

app.listen(port, (req, res) => {
    console.log("Server is running on port " + port);
});

export default app;