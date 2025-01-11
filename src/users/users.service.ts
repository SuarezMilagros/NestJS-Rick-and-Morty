import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';


@Injectable()
export class UsersService {
  private users: User[] = [
    { 
      id: 1, 
      email: 'admin@example.com', 
      password: bcrypt.hashSync('administrador', 10), 
      role: 'admin' 
    },

    { 
      id: 2, 
      email: 'user@example.com', 
      password: bcrypt.hashSync('usuario123', 10), 
      role: 'user' 
    },
  ];

  /**
   * Busca un usuario por su correo electrónico.
   * @param email Correo del usuario
   * @returns User o undefined si no existe
   */
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  /**
   * Crea un nuevo usuario con rol de 'user' por defecto.
   * @param email Correo del usuario
   * @param password Contraseña sin encriptar
   * @returns El usuario creado
   */
  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { 
      id: this.users.length + 1, 
      email, 
      password: hashedPassword, 
      role: 'user' 
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Retorna todos los usuarios (para debugging o administración).
   * @returns Lista de usuarios
   */
  getAllUsers(): User[] {
    return this.users;
  }
}
