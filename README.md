# Word Counter Worker

The Word Counter Worker is a TypeScript project designed to process files by counting the frequency of each word in the file. It retrieves file IDs from a RabbitMQ queue, downloads the corresponding files from an S3 bucket, processes them, updates their status in a PostgreSQL database, and uploads the results to another S3 bucket.

## Prerequisites

- Node.js (Install via [NVM](https://github.com/nvm-sh/nvm))
- Docker (for running dependencies)
- RabbitMQ
- PostgreSQL
- S3 Bucket (AWS S3 or compatible service like MinIO)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vnikhra/word-counter-worker.git
    ```

2. Navigate to the project directory:

    ```bash
    cd word-counter-worker
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Building the Project

To build the project, run:

```bash
npm run build
```

## Running the Application

After building the project, start the application using:

```bash
node build/src/index.js
```

## Running Tests

Tests can be executed with:

```bash
npm test
```

## Docker Image

A Docker image for this project is available at `vibhor10097/word-counter-worker`.

## Docker Compose

For easier setup, a Docker Compose file is provided in the [word-counter-deployment](https://github.com/vnikhra/word-counter-deployment) repository. Follow the instructions there to run the required services.

## Environment Variables

Ensure the following environment variables are set before running the application:

```dotenv
DB_HOST="<Database Host>"
DB_PORT="<Database Port>"
DB_USER="<Database User>"
DB_PASSWORD="<Database Password>"
DB_NAME="<Database Name>"

S3_ENDPOINT="<S3 Endpoint URL>"
S3_ACCESS_KEY="<S3 Access Key>"
S3_SECRET_KEY="<S3 Secret Key>"
S3_UPLOAD_BUCKET="<Upload Bucket Name>"
S3_DOWNLOAD_BUCKET="<Download Bucket Name>"

AMQ_URL="<RabbitMQ URL>"
AMQ_QUEUE="<RabbitMQ Queue Name>"
```

Replace the placeholders with appropriate values specific to your environment.

## Related Repositories

- [Word Counter Client](https://github.com/vnikhra/word-counter-client): Client application to initiate the word counting process. Refer to its README for usage instructions.
- [Word Counter API](https://github.com/vnikhra/word-counter-api): API server that lets the above client to put files for processing and to check when processing is done. Refer to its README for usage instructions.
