import db from "../config/dbConfig";

export async function setFileAsBeingProcessed(fileId: string){
    await db("files").where({ id: fileId }).update({ status: "processing" });
}

export async function setFileAsCompleted(fileId: string){
    await db("files").where({ id: fileId }).update({ status: "completed" });
}