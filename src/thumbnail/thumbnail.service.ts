import * as sha256 from 'crypto-js/sha256';
import * as sharp from 'sharp';
import { FitEnum } from 'sharp';
import { Injectable } from '@nestjs/common';
import { ThumbnailOptions } from 'src/thumbnail/thumbnail.interface';
import { AssetService } from 'src/asset/asset.service';
import {
  cachedFileExists,
  getCachedSignedUrl,
  getAsset,
  uploadCachedFile,
} from 'src/utils/S3';

@Injectable()
export class ThumbnailService {
  constructor(private readonly assetService: AssetService) {}
  async getThumbnail(id: string, options: ThumbnailOptions) {
    const { w, h, fit } = options;
    const hash = sha256(`${id}-${w}-${h}`).toString();
    const exists = await cachedFileExists(hash);

    if (exists) {
      return getCachedSignedUrl(hash);
    }

    const asset = await this.assetService.getAsset(id);

    if (!asset) {
      // @TODO return a placeholder
    }

    const response = await getAsset(asset.key);

    // @TODO based on contentType, decide what to do images/pdf/video/...

    const buffer = await sharp(Buffer.from(response.Body))
      .resize(w, h, { fit: fit as keyof FitEnum })
      .jpeg()
      .toBuffer();

    await uploadCachedFile(hash, buffer, 'image/jpeg');

    return getCachedSignedUrl(hash);
  }
}
