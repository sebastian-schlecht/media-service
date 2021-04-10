import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateAssetDto } from './asset.dto';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @Get(':id')
  getAsset(@Param() params) {
    return this.assetService.getAsset(params.id);
  }

  @Post()
  createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto);
  }
}
