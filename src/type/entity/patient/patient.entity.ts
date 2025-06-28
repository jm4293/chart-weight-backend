export interface PatientEntity {
  id: number;
  name: string | null;
  birth: string | null;
  register_num: string;
  created_at: Date;
}
