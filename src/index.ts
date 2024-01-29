import dotenv from "dotenv";
dotenv.config();

import amqConfig from "./config/amqConfig";
import {processFileId} from "./processors/fileProcessor";

const QUEUE_NAME = process.env.AMQ_QUEUE || "to_process"

export async function main() {
    const amqChannel = await amqConfig();
    amqChannel.consume(QUEUE_NAME, async (msg) => {
        if (msg !== null) {
            const fileId = msg.content.toString();
            amqChannel.ack(msg);
            await processFileId(fileId)
        }
    });
}

main();
