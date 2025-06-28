import { IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterPatientWeightImageDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  image: File;
}
