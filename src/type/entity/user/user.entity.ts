export interface UserEntity {
  id: number;
  email: string;
  password: string;
  type: number;
  name: string;
  created_at: Date;
}
