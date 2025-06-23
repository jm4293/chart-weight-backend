import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientWeightDto } from '../../type/dto/patient';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get(':id')
  async getPatientById(@Param('id') id: string) {
    const patientInfo = await this.patientService.getPatientById(id);

    return { patient: patientInfo };
  }

  @Get()
  async getPatientList() {
    const patientInfo = await this.patientService.getPatientList();

    return { patient: patientInfo };
  }

  @Post()
  async createPatient(@Body() dto: CreatePatientWeightDto) {
    const patientInfo = await this.patientService.createPatient(dto);

    return { patient: patientInfo };
  }
}
