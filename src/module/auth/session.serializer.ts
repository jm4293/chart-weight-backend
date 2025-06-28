import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from '../../type/entity/user';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: UserEntity, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: Function) {
    const user = await this.userService.findById(Number(id));

    done(null, user);
  }
}
