import { IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterPatientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  birth: string;

  @IsNotEmpty()
  register_num: number;
}
