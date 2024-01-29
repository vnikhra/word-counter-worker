import getPostgresConnection from "../config/dbConfig";

export async function setFileAsBeingProcessed(fileId: string){
    const db = await getPostgresConnection();
    await db("files").where({ id: fileId }).update({ status: "processing" });
}

export async function setFileAsCompleted(fileId: string){
    const db = await getPostgresConnection();
    await db("files").where({ id: fileId }).update({ status: "completed" });
}