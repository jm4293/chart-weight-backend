import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreatePatientWeightDto } from '../../type/dto/patient';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async getPatientById(id: string) {
    return this.prisma.patient.findUnique({
      where: { id: Number(id) },
      select: {
        name: true,
        birth: true,
        register_num: true,
        weights: {
          select: {
            weight: true,
            image_url: true,
            created_at: true,
          },
        },
      },
    });
  }

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

  async createPatient(dto: CreatePatientWeightDto) {
    const { id, weight, image_url } = dto;

    const patient = await this.prisma.patient.findUnique({
      where: { id: Number(id) },
    });

    if (!patient) {
      throw new BadRequestException('해당 id의 환자가 존재하지 않습니다.');
    }

    await this.prisma.weight.create({
      data: {
        patient_id: Number(id),
        weight,
        image_url,
      },
    });
  }
}
