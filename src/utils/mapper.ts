import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

export default new DataMapper({ client: new DynamoDB() });
