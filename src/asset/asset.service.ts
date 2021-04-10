import { Logger } from 'nestjs-pino';
import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './asset.dto';
import Asset from './asset.model';
import mapper from 'src/utils/mapper';
import { moveUpload } from 'src/utils/S3';

@Injectable()
export class AssetService {
  constructor(private readonly logger: Logger) {}
  getAsset(id: string) {
    return { foo: id };
  }

  async createAsset(createAssetDto: CreateAssetDto) {
    const { prefix, creatorId, name, caption, uploadKey } = createAssetDto;

    const id = v4();
    const now = new Date().toISOString();
    const { key, contentType } = await moveUpload(uploadKey);

    const asset = await mapper.put(
      Object.assign(new Asset(), {
        id,
        prefix,
        creatorId,
        key,
        name,
        contentType,
        serverCreatedAt: now,
        serverUpdatedAt: now,
        caption,
      }),
    );
    return asset;
  }
}
