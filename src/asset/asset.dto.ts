import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  prefix: string;

  @IsNotEmpty()
  @IsUUID()
  creatorId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  caption?: string;

  @IsNotEmpty()
  @IsString()
  uploadKey: string;
}

export class UpdateAssetDto {
  @IsString()
  caption?: string;
}
