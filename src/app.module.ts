import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetController } from './asset/asset.controller';
import { AssetService } from './asset/asset.service';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { ThumbnailController } from './thumbnail/thumbnail.controller';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [AppController, AssetController, UploadController, ThumbnailController],
  providers: [AppService, AssetService, UploadService],
})
export class AppModule {}
