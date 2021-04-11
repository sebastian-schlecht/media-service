import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from './asset.dto';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @Get(':id')
  getAsset(@Param() params) {
    return this.assetService.getAsset(params.id);
  }

  @Put(':id')
  updateAsset(@Param() params, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.updateAsset(params.id, updateAssetDto);
  }

  @Delete(':id')
  deleteAsset(@Param() params) {
    return this.assetService.deleteAsset(params.id);
  }

  @Post()
  createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto);
  }
}
