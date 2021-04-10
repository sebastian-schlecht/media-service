import { Controller, Get, Query, Param } from '@nestjs/common';
import { AssetService } from 'src/asset/asset.service';
import { ThumbnailOptions } from 'src/asset/asset.dto';

@Controller('asset/:id')
export class ThumbnailController {
  constructor(private readonly assetService: AssetService) {}
  @Get('thumbnail')
  getThumbnail(@Param() params, @Query() options: ThumbnailOptions) {
    return this.assetService.getThumbnail(params.id, options);
  }
}
