import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterPatientWeightDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  weight: number | null;

  @IsOptional()
  image_url: string | null;
}
