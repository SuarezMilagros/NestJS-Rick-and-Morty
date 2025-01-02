import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Address } from 'src/models/addres.model';

@Injectable()
export class AuthService {
  private users = [
    { userId: 1, email: 'test@example.com', password: 'password123', name: 'nombre prueba' }, // Usuarios de prueba
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      const { password, ...result } = user;
      return result; // Retorna el usuario sin la contraseña
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload.userId,
      userName: user.name
    };
  }

  async register(name: string, nickname: string, email: string, birthday: number, password: string, address: Address) {
    const userExists = this.users.find(user => user.email === email);
    if (userExists) {
      throw new Error('User already exists'); // Excepción para evitar duplicados
    }

    const newUser = {
      userId: this.users.length + 1,
      name,
      nickname,
      email,
      birthday,
      password,
      address
    };

    this.users.push(newUser);
    return { message: 'User registered successfully', userId: newUser.userId };
  }

  async getProfile(id:number) {
    const profile = this.users.find(user => user.userId === id);
    console.log(profile);
    if (!profile){
      throw new Error ("No existe el perfil");
    }
    return profile;
  }

}
