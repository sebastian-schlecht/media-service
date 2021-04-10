import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { handler } from '../functions/http';
import { stack } from '../stack';

export const restApi = new LambdaRestApi(stack, 'rest-api', {
  handler,
});
