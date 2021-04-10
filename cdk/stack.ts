import { App, Stack } from '@aws-cdk/core';
import { name } from '../package.json';

const { region = undefined, stage = 'dev' } = process.env.CDK_CONTEXT_JSON
  ? JSON.parse(process.env.CDK_CONTEXT_JSON)
  : {};

export const app = new App();
export const stack = new Stack(app, 'media-service', {
  env: { region },
  stackName: name + (stage === 'prod' ? '' : `-${stage}`),
});
