import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import { Duration, RemovalPolicy } from '@aws-cdk/core';

import { stack } from '../stack';

export const mediaBucket = new Bucket(
  stack,
  `${stack.stackName}-media-bucket`,
  {
    versioned: true,
    /**
     * In production, you want `removalPolicy: RemovalPolicy.RETAIN,`
     */
    removalPolicy: RemovalPolicy.DESTROY,
    encryption: BucketEncryption.KMS_MANAGED,
  },
);

export const uploadBucket = new Bucket(
  stack,
  `${stack.stackName}-upload-bucket`,
  {
    removalPolicy: RemovalPolicy.DESTROY,
    encryption: BucketEncryption.KMS_MANAGED,
    lifecycleRules: [
      {
        enabled: true,
        expiration: Duration.days(30),
      },
    ],
  },
);

export const cacheBucket = new Bucket(
  stack,
  `${stack.stackName}-cache-bucket`,
  {
    removalPolicy: RemovalPolicy.DESTROY,
    encryption: BucketEncryption.KMS_MANAGED,
    lifecycleRules: [
      {
        enabled: true,
        expiration: Duration.days(7),
      },
    ],
  },
);
