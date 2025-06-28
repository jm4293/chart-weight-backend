import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  RegisterPatientDto,
  RegisterPatientWeightDto,
} from '../../type/dto/patient';
import { Request } from 'express';
import { AuthenticatedGuard } from '../../common/guard/authenticated.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/multer';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('list')
  @UseGuards(AuthenticatedGuard)
  async getPatientList() {
    const patientInfo = await this.patientService.getPatientList();

    return { patients: patientInfo };
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getPatientById(@Req() req: Request, @Param('id') id: string) {
    const patientInfo = await this.patientService.getPatientById(id);

    return { patient: patientInfo };
  }

  @Get('weight/:id')
  @UseGuards(AuthenticatedGuard)
  async getPatientWeightById(@Param('id') id: string) {
    const patientWeight = await this.patientService.getPatientWeightById(id);

    return { weights: patientWeight };
  }

  @Post('register')
  @UseGuards(AuthenticatedGuard)
  async registerPatient(@Body() dto: RegisterPatientDto) {
    await this.patientService.registerPatient(dto);

    return {};
  }

  @Post('weight')
  @UseGuards(AuthenticatedGuard)
  async registerPatientWeight(@Body() dto: RegisterPatientWeightDto) {
    await this.patientService.registerPatientWeight(dto);

    return {};
  }

  @Post('weight-image')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async registerPatientWeightImage(
    @Body('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { filename } = file;

    await this.patientService.registerPatientWeightImage({ id, filename });

    return { imageUrl: filename };
  }

  @Delete('weight/:id')
  @UseGuards(AuthenticatedGuard)
  async deletePatientWeight(@Param('id') id: string) {
    await this.patientService.deletePatientWeight(id);

    return {};
  }
}
