export const awsConfig = {
    s3: {
        REGION: "us-east-2",
        BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
      },
    apiGateway: {
        REGION: "us-east-2",
        URL: "YOUR_API_GATEWAY_URL"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_txFHftOWq",
        APP_CLIENT_ID: "5rkh7p4uc10m5fp242v5td2qh3",
        IDENTITY_POOL_ID: "us-east-2:d0bda4e2-97e3-450c-9e1d-604a08e421db"
    }
};