import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

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
}