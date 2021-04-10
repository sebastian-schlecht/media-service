import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Duration } from '@aws-cdk/core';
import { assetsTable } from '../resources/table';
import { assetsBucket, uploadBucket, cacheBucket } from '../resources/buckets';
import { stack } from '../stack';

export const handler = new Function(stack, 'function-http', {
  code: Code.fromAsset('./dist'),
  functionName: `${stack.stackName}-http`,
  handler: 'serverless.default',
  logRetention: 7,
  memorySize: 1024,
  runtime: Runtime.NODEJS_12_X,
  timeout: Duration.seconds(30),
  environment: {
    DDB_TABLE_NAME_ASSETS: assetsTable.tableName,
    S3_BUCKET_NAME_UPLOADS: uploadBucket.bucketName,
    S3_BUCKET_NAME_ASSETS: assetsBucket.bucketName,
    S3_BUCKET_NAME_CACHE: cacheBucket.bucketName,
  },
});
