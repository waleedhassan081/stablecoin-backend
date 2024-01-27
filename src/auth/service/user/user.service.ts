import { Injectable } from '@nestjs/common';
import { User } from '../../interface/user/user.interface';
import * as bcrypt from 'bcrypt';
import { readJsonFile } from 'src/utilities/helper';
@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = readJsonFile('../../users.json');
  }
  
  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = this.findByEmail(email);
    return user && await bcrypt.compare(password, user.password) ? user : undefined;
  }
}
