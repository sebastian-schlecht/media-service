import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

const client = new S3();

const {
  S3_BUCKET_NAME_UPLOADS,
  S3_BUCKET_NAME_ASSETS,
  S3_BUCKET_NAME_CACHE,
} = process.env;

export async function getUploadUrl() {
  const key = v4();
  const expires = 24 * 3600; // 86400

  const url = await client.getSignedUrl('putObject', {
    Bucket: S3_BUCKET_NAME_UPLOADS,
    Key: key,
    Expires: expires,
  });

  return { url, key, expires };
}

export async function cachedFileExists(key: string) {
  try {
    await client
      .headObject({ Bucket: S3_BUCKET_NAME_CACHE, Key: key })
      .promise();
  } catch (error) {
    return false;
  }
  return true;
}

export async function moveUpload(uploadKey: string) {
  const key = v4();
  const params = {
    CopySource: `${S3_BUCKET_NAME_UPLOADS}/${uploadKey}`,
    Bucket: S3_BUCKET_NAME_ASSETS,
    Key: key,
  };

  await client.copyObject(params).promise();

  const head = await client
    .headObject({
      Bucket: S3_BUCKET_NAME_ASSETS,
      Key: key,
    })
    .promise();

  return { key, contentType: head.ContentType };
}
