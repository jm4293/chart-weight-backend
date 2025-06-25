import 'express';
import { User } from '../entity/user';

declare module 'express' {
  interface Request {
    user: Omit<User, 'password'>;
  }
}
