import { Injectable } from '@nestjs/common';
import { getUploadUrl } from 'src/utils/S3';

@Injectable()
export class UploadService {
  async createUpload() {
    return getUploadUrl();
  }
}
