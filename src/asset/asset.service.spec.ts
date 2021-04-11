import { Test, TestingModule } from '@nestjs/testing';
import * as Chance from 'chance';
import { AssetService } from './asset.service';
import Asset from './asset.model';

import mapper from './../utils/mapper';

const chance = new Chance();

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetService],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAsset', () => {
    it('returns an asset when found', async () => {
      const asset = new Asset();
      const spy = jest.spyOn(mapper, 'get').mockResolvedValueOnce(asset);
      const id = chance.guid();

      const result = await service.getAsset(id);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id });
      expect(result).toBe(asset);
    });
  });
});
