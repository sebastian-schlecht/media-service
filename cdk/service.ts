import { app } from './stack';

import { assetsTable } from './resources/table';
import { assetsBucket, uploadBucket, cacheBucket } from './resources/buckets';
import { handler } from './functions/http';
import './resources/api';

assetsTable.grantReadWriteData(handler);

assetsBucket.grantReadWrite(handler);
uploadBucket.grantReadWrite(handler);
cacheBucket.grantReadWrite(handler);

app.synth();
