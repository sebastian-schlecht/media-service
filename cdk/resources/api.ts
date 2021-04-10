import { RestApi } from '@aws-cdk/aws-apigateway';
import { stack } from '../stack';

export const restApi = new RestApi(stack, 'rest-api', {
  endpointExportName: `${stack.stackName}-rest-api-url`,
  restApiName: `${stack.stackName}-rest-api`,
});
