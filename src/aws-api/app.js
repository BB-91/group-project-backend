import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from 'express';

import bodyParser from "body-parser";
import cors from "cors";

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";


const app = express();
const port = 3050;

// app.use(cors({origin: `http://localhost:${port}`}));
app.use(cors({origin: `http://localhost:3000`}));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

const { ACCESS_SECRET, ACCESS_KEY, REGION, BUCKET } = process.env;

aws.config.update({
    secretAccessKey: ACCESS_SECRET,
    accessKeyId: ACCESS_KEY,
    region: REGION,
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: (req, file, cb) => {
            console.log("file: ", file);
            cb(null, file.originalname)
        }
    })
})

app.post('/upload', upload.single('file'), async (req, res, next) => {
    res.send('Successfully uploaded ' + req.file.location + ' location!')
})

app.get("/list", async (req, res) => {
    const result = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    const fileNames = result.Contents.map(item => item.Key);
    // console.log("result: ", result);
    // console.log("fileNames: ", fileNames)
    res.send(fileNames);
})

app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename;
    let result = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(result.Body);
})

app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename;
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("File Deleted Successfully");
})