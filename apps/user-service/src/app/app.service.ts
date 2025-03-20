import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createUser(user: any) {
    return user;
  }

  getAllUsers() {
    return [];
  }
}
