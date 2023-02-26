import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
  signatureVersion: process.env.REACT_APP_AWS_SIGNATURE_VERSION,
});

export const s3 = new AWS.S3();
