import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  beforeEach(async () => {
    const mockPatientService = {
      getPatientList: jest.fn().mockResolvedValue([{ id: 1, name: '홍길동' }]),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockPatientService,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getPatientList should return patient list', async () => {
    const result = await controller.getPatientList();
    expect(service.getPatientList).toHaveBeenCalled();
    expect(result).toEqual({ patient: [{ id: 1, name: '홍길동' }] });
  });
});
