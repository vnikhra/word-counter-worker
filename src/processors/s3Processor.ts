import {downloadFileFromS3, uploadFileToS3} from "../utils/s3Utils";
import {s3} from "../config/s3Config";
import {countWords} from "@vnikhra/word-counter";

const UPLOAD_BUCKET_NAME =
    process.env.S3_UPLOAD_BUCKET || "word-counter-raw-files";
const DOWNLOAD_BUCKET_NAME =
    process.env.S3_DOWNLOAD_BUCKET || "word-counter-result";
export async function getFileWordCount(fileId: string) {
    try {
        const s3Params = {
            Bucket: UPLOAD_BUCKET_NAME,
            Key: fileId
        };

        const fileStream = await downloadFileFromS3(s3, s3Params);
        return await countWords(fileStream);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

export async function writeObjectToFile(object: { [key: string]: number } | undefined, fileId: string) {
    try {
        const fileContent = JSON.stringify(object);

        const s3Params = {
            Bucket: DOWNLOAD_BUCKET_NAME,
            Key: fileId,
            Body: fileContent
        };

        await uploadFileToS3(s3, s3Params);
        console.log(`Object written to file ${fileId} in S3.`);
    } catch (error) {
        console.error('Error writing object to file in S3:', error);
    }
}