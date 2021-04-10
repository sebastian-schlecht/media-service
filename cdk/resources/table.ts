import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import { RemovalPolicy } from '@aws-cdk/core';
import { stack } from '../stack';

export const assetsTable = new Table(stack, `${stack.stackName}-assets-table`, {
  billingMode: BillingMode.PAY_PER_REQUEST,
  partitionKey: { name: 'id', type: AttributeType.STRING },
  pointInTimeRecovery: true,
  //   removalPolicy: RemovalPolicy.RETAIN,
  removalPolicy: RemovalPolicy.DESTROY,
  serverSideEncryption: true,
  tableName: `${stack.stackName}-assets`,
});
