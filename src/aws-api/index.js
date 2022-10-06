import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from 'express';

import bodyParser from "body-parser";
import cors from "cors";

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

import { port } from '../data/s3ServerData.mjs';

const app = express();
// app.use(cors({origin: `http://localhost:3000`}));
app.use(cors({origin: `*`}));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server for AWS S3 listening on port: ${port}`);
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
        // acl: "public-read",
        bucket: BUCKET,
        key: (req, file, cb) => {
            console.log("file: ", file);
            cb(null, file.originalname)
        }
    })
})

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: "public-read",
//         bucket: BUCKET,
//         key: (req, file, cb) => {
//             console.log("file: ", file);
//             cb(null, file.originalname)
//         }
//     })
// })

// const getPresignedURL = async (filename) => {
//     const params = {
//         Bucket: BUCKET,
//         Key: filename,
//         Expires: 60
//     }

//     const preSignedURL = await s3.getSignedUrl('getObject', params);
//     return preSignedURL;
// }

const S3_OPERATION = {
    getObject: 'getObject',
    putObject: 'putObject',
}

const _getSignedURL = async (filename, operation) => {
    if (!Object.values(S3_OPERATION).includes(operation)) {
        throw new Error(`Invalid operation: '${operation}'`)
    }

    const params = {
        Bucket: BUCKET,
        Key: filename,
        Expires: 60
    }

    const signedURL = await s3.getSignedUrl(operation, params);
    return signedURL;
}

const getSignedDownloadURL = async (filename) => {
    return _getSignedURL(filename, S3_OPERATION.getObject)
}

const getSignedUploadURL = async (filename) => {
    return _getSignedURL(filename, S3_OPERATION.putObject)
}

app.post('/upload', upload.single('file'), async (req, res, next) => {
    // call s3Uploader.upload() here...
    // use pre-signed s3 url here
    res.send('Successfully uploaded ' + req.file.location + ' location!');
})

app.get("/list", async (req, res) => {
    const result = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    const fileNames = result.Contents.map(item => item.Key);
    res.send(fileNames);
    
})

app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename
    let result = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    console.log("result: ", result);
    res.status(200).send(result.Body)
})




// app.get("/getSignedDownloadUrl/:filename", async (req, res) => {
//     const filename = req.params.filename;
//     const preSignedUrl = await getPresignedURL(filename);
//     // res.send(preSignedUrl);
//     // res.send(JSON.stringify(preSignedUrl)); // need to wrap inside object????
//     res.send(JSON.stringify({preSignedUrl})); // need to wrap inside object????
// })

app.get("/getSignedDownloadUrl/:filename", async (req, res) => {
    const filename = req.params.filename;
    const signedUrl = await getSignedDownloadURL(filename);
    res.send(JSON.stringify({signedUrl}));
})

app.get("/getSignedUploadUrl/:filename", async (req, res) => {
    const filename = req.params.filename;
    const signedUrl = await getSignedUploadURL(filename);
    res.send(JSON.stringify({signedUrl}));
})

app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename;
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("File Deleted Successfully");
})