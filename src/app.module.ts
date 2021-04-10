import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetController } from './asset/asset.controller';
import { AssetService } from './asset/asset.service';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [AppController, AssetController],
  providers: [AppService, AssetService],
})
export class AppModule {}
