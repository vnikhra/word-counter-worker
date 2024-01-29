import { processFileId } from "./fileProcessor";
import { setFileAsBeingProcessed, setFileAsCompleted } from "./dbProcessor";
import { getFileWordCount, writeObjectToFile } from "./s3Processor";

jest.mock("./dbProcessor");
jest.mock("./s3Processor");

describe("File Processor", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("processFileId", () => {
        it("should process file ID correctly", async () => {
            const fileId = "test-file-id";
            const mockWordCount = 42;

            (getFileWordCount as jest.Mock).mockResolvedValueOnce(mockWordCount);

            await processFileId(fileId);

            expect(setFileAsBeingProcessed).toHaveBeenCalledWith(fileId);
            expect(getFileWordCount).toHaveBeenCalledWith(fileId);
            expect(writeObjectToFile).toHaveBeenCalledWith(mockWordCount, fileId);
            expect(setFileAsCompleted).toHaveBeenCalledWith(fileId);
        });

        it("should handle errors gracefully", async () => {
            const fileId = "test-file-id";
            const mockError = new Error("Test error");

            (getFileWordCount as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(processFileId(fileId)).rejects.toThrowError(mockError);
            expect(setFileAsBeingProcessed).toHaveBeenCalledWith(fileId);
            expect(getFileWordCount).toHaveBeenCalledWith(fileId);
            expect(writeObjectToFile).not.toHaveBeenCalled();
            expect(setFileAsCompleted).not.toHaveBeenCalled();
        });
    });
});
