import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Duration } from '@aws-cdk/core';
import { stack } from '../stack';

export const handler = new Function(stack, 'function-http', {
  code: Code.fromAsset('./dist'),
  functionName: `${stack.stackName}-http`,
  handler: 'serverless.default',
  logRetention: 7,
  memorySize: 1024,
  runtime: Runtime.NODEJS_12_X,
  timeout: Duration.seconds(30),
});
