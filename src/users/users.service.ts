// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface User {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, email: 'admin@example.com', password: bcrypt.hashSync('admin', 10), role: 'admin' },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { id: this.users.length + 1, email, password: hashedPassword, role: 'user' };
    this.users.push(newUser);
    return newUser;
  }
}
