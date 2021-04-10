import { Logger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './asset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly logger: Logger) {}
  getAsset(id: string) {
    return { foo: id };
  }

  createAsset(createAssetDto: CreateAssetDto) {
    this.logger.log(createAssetDto);
    return { foo: 'bar' };
  }
}
