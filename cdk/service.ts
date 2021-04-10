import { LambdaIntegration } from '@aws-cdk/aws-apigateway';

import { app } from './stack';
import { restApi } from './resources/api';

import { http } from './functions/http';

const integration = restApi.root.addResource('{any+}');

integration.addMethod('ANY', new LambdaIntegration(http));

app.synth();
