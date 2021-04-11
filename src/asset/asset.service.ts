import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from './asset.dto';
import Asset from './asset.model';
import mapper from '../utils/mapper';
import { moveUpload } from '../utils/S3';

@Injectable()
export class AssetService {
  async getAsset(id: string) {
    const item = await mapper.get(
      Object.assign(new Asset(), {
        id,
      }),
    );
    return item;
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

  async updateAsset(id: string, updateAssetDto: UpdateAssetDto) {
    const { caption } = updateAssetDto;
    const item = await mapper.get(
      Object.assign(new Asset(), {
        id,
      }),
    );

    Object.assign(item, { caption });
    await mapper.update(item);
  }

  async deleteAsset(id: string) {
    await mapper.delete(Object.assign(new Asset(), { id }));
  }
}
