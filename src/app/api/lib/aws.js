import { S3Client } from '@aws-sdk/client-s3';

// Create an S3 client instance with the appropriate configuration
const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAX6H4ZPMQ3UCKPWEN',
        secretAccessKey: process.env.SECRET_KEY,
    }
});

export default s3;
