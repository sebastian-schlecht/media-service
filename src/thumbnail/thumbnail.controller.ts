import {
  Controller,
  Get,
  Query,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Redirect,
} from '@nestjs/common';

import { ThumbnailService } from 'src/thumbnail/thumbnail.service';

@Controller('asset/:id')
export class ThumbnailController {
  constructor(private readonly thumbnailService: ThumbnailService) {}
  @Get('thumbnail')
  @Redirect()
  async getThumbnail(
    @Param() params,
    @Query('w', new DefaultValuePipe(1000), ParseIntPipe) w: number,
    @Query('h', new DefaultValuePipe(1000), ParseIntPipe) h: number,
    @Query('fit', new DefaultValuePipe('contain')) fit: string,
  ) {
    const url = await this.thumbnailService.getThumbnail(params.id, {
      w,
      h,
      fit,
    });
    return {
      url,
      statusCode: 302,
    };
  }
}
