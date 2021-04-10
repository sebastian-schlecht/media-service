import { LambdaIntegration } from '@aws-cdk/aws-apigateway';

import { app } from './stack';
import './resources/api';
import './functions/http';

app.synth();
