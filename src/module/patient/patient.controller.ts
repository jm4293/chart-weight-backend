import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  RegisterPatientDto,
  RegisterPatientWeightDto,
} from '../../type/dto/patient';
import { Request } from 'express';
import { AuthenticatedGuard } from '../../common/guard/authenticated.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getPatientById(@Req() req: Request, @Param('id') id: string) {
    const patientInfo = await this.patientService.getPatientById(id);

    return { patient: patientInfo };
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getPatientList() {
    const patientInfo = await this.patientService.getPatientList();

    return { patient: patientInfo };
  }

  @Post('register')
  @UseGuards(AuthenticatedGuard)
  async registerPatient(@Body() dto: RegisterPatientDto) {
    const patientInfo = await this.patientService.registerPatient(dto);

    return { patient: patientInfo };
  }

  @Post('weight')
  @UseGuards(AuthenticatedGuard)
  async registerPatientWeight(@Body() dto: RegisterPatientWeightDto) {
    const patientInfo = await this.patientService.registerPatientWeight(dto);

    return { patient: patientInfo };
  }
}
