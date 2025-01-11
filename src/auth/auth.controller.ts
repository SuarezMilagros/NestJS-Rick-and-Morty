// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, UnauthorizedException, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Address } from 'src/models/addres.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { name: string, nickname: string, email: string; birthday: number, password: string, address: Address}) {
    return this.authService.register(body.name, body.nickname, body.email, body.birthday, body.password, body.address);
  }


  @Get('profile/:id')
  async profile1(@Param('id') id: number) {
  return this.authService.getProfile(Number(id)); // Convertir id a número si es necesario
}

}

