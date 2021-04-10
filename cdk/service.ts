import { app } from './stack';

import { assetsTable } from './resources/table';
import { handler } from './functions/http';
import './resources/api';

assetsTable.grantReadWriteData(handler);

app.synth();
