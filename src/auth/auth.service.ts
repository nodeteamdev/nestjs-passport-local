import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username, pass): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user) {
      const match = await bcrypt.compare(pass, user.password);

      if (match) {
        return user;
      }
    }
    return null;
  }
}
