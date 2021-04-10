import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AssetController } from './asset/asset.controller';
import { AssetService } from './asset/asset.service';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { ThumbnailController } from './thumbnail/thumbnail.controller';
import { ThumbnailService } from './thumbnail/thumbnail.service';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [AssetController, UploadController, ThumbnailController],
  providers: [AssetService, UploadService, ThumbnailService],
})
export class AppModule {}
