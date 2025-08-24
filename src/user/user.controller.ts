import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

   @Post('login')
   async login(@Body() loginDto : LoginDto){
     return this.userService.login(loginDto)   
   }

   @UseGuards(JwtAuthGuard)
   @Get('profile')
   async getProfile(@Request() req) {
     return {
       message: 'Perfil do usuário autenticado',
       user: req.user
     };
   }
}