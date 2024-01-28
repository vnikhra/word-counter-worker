import * as AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });
export const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  s3ForcePathStyle: true, // Needed for MinIO
  signatureVersion: "v4", // Needed for MinIO
});
