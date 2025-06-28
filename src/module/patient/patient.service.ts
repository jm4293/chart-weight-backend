import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import {
  RegisterPatientDto,
  RegisterPatientWeightDto,
} from '../../type/dto/patient';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async getPatientList() {
    return this.prisma.patient.findMany({
      select: {
        id: true,
        name: true,
        birth: true,
        register_num: true,
      },
    });
  }

  async getPatientById(id: string) {
    return this.prisma.patient.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        birth: true,
        register_num: true,
      },
    });
  }

  async getPatientWeightById(id: string) {
    return this.prisma.weight.findMany({
      where: { patient_id: Number(id) },
      select: {
        id: true,
        weight: true,
        file_name: true,
        created_at: true,
      },
    });
  }

  async registerPatient(dto: RegisterPatientDto) {
    const { name, birth, register_num } = dto;

    const existingPatient = await this.prisma.patient.findUnique({
      where: { register_num },
    });

    if (existingPatient) {
      throw new BadRequestException('환자가 이미 등록되어 있습니다.');
    }

    return this.prisma.patient.create({
      data: {
        name,
        birth,
        register_num,
      },
    });
  }

  async registerPatientWeight(dto: RegisterPatientWeightDto) {
    const { id, weight } = dto;

    await this.prisma.findPatientById(Number(id));

    await this.prisma.weight.create({
      data: {
        patient_id: Number(id),
        weight,
      },
    });
  }

  async registerPatientWeightImage(dto: { id: string; filename: string }) {
    const { id, filename } = dto;

    await this.prisma.findPatientById(Number(id));

    await this.prisma.weight.create({
      data: {
        patient_id: Number(id),
        file_name: filename,
      },
    });
  }

  async deletePatientWeight(id: string) {
    await this.prisma.findWeightById(Number(id));

    await this.prisma.weight.delete({
      where: { id: Number(id) },
    });
  }
}
