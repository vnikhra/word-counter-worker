import {setFileAsBeingProcessed, setFileAsCompleted} from "./dbProcessor";
import {getFileWordCount, writeObjectToFile} from "./s3Processor";

export async function processFileId(fileId: string){
    console.log(`Received file ID: ${fileId}`);
    await setFileAsBeingProcessed(fileId);
    const wordCount = await getFileWordCount(fileId);
    await writeObjectToFile(wordCount, fileId);
    await setFileAsCompleted(fileId);
}