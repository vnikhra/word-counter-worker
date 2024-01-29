import { S3 } from "aws-sdk";
import { downloadFileFromS3, uploadFileToS3 } from "./s3Utils";

jest.mock("aws-sdk", () => {
    const mockedS3 = {
        getObject: jest.fn(),
        putObject: jest.fn()
    };
    return { S3: jest.fn(() => mockedS3) };
});

describe("S3 Functions", () => {
    let mockS3: S3;

    beforeEach(() => {
        jest.clearAllMocks();
        mockS3 = new S3();
    });

    describe("downloadFileFromS3", () => {
        it("should return a promise that resolves with a readable stream", async () => {
            const mockStream = {} as any;
            const mockParams = { Bucket: "test-bucket", Key: "test-key" };

            (mockS3.getObject as jest.Mock).mockReturnValueOnce({
                createReadStream: jest.fn(() => mockStream)
            });
            const result = await downloadFileFromS3(mockS3, mockParams);

            expect(result).toBe(mockStream);
            expect(mockS3.getObject).toHaveBeenCalledWith(mockParams);
        });
    });

    describe("uploadFileToS3", () => {
        it("should return a promise that resolves when upload is successful", async () => {
            const mockParams = { Bucket: "test-bucket", Key: "test-key", Body: "test-body" };
            (mockS3.putObject as jest.Mock).mockImplementationOnce((params, callback) => {
                callback(null);
            });
            await expect(uploadFileToS3(mockS3, mockParams)).resolves.toBeUndefined();
            expect(mockS3.putObject).toHaveBeenCalledWith(mockParams, expect.any(Function));
        });

        it("should return a promise that rejects when upload fails", async () => {
            const mockError = new Error("Upload failed");
            const mockParams = { Bucket: "test-bucket", Key: "test-key", Body: "test-body" };
            (mockS3.putObject as jest.Mock).mockImplementationOnce((params, callback) => {
                callback(mockError);
            });

            await expect(uploadFileToS3(mockS3, mockParams)).rejects.toThrowError(mockError);
            expect(mockS3.putObject).toHaveBeenCalledWith(mockParams, expect.any(Function));
        });
    });
});
