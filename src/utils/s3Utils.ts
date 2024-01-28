import {S3} from "aws-sdk";
import {Readable} from "node:stream";
export function downloadFileFromS3(s3: AWS.S3, params: S3.GetObjectRequest): Promise<any> {
    return new Promise<Readable>((resolve) => {
        const s3Stream = s3.getObject(params).createReadStream();
        resolve(s3Stream);
    });
}

export function uploadFileToS3(s3: AWS.S3, params: S3.PutObjectRequest): Promise<void> {
    return new Promise((resolve, reject) => {
        s3.putObject(params, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}