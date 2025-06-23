import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientWeightDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  weight: number | null;

  @IsOptional()
  image_url: string | null;
}
