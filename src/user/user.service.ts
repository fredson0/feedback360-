import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}
     
    async create(createUserDto: CreateUserDto) {
        console.log('criando usuario', createUserDto.email);

        // verificar se o email ja existe
        const existingUser = await this.prisma.user.findUnique ({
            where: { email: createUserDto.email }
        });

        if (existingUser){
            throw new ConflictException(' Email já está em uso');
        }
        
        //  faz criptografia da senha
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        //cria o usuario
        const user = await this.prisma.user.create({
            data: {
                nome: createUserDto.nome,
                email: createUserDto.email,
                password: hashedPassword,
            },
        });

        console.log('usuario criado com ID', user.id);

        // remove a senha da resposta
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

     
    async findByEmail(email:string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

   async login(loginDto: LoginDto){
      const user = await this.findByEmail(loginDto.email);

        if (!user){
            throw new UnauthorizedException('USUARIO NAO ENCONTRADO');
        }
           
        const isPassWordValid = await bcrypt.compare(loginDto.password,user.password);
        if (!isPassWordValid){
            throw new UnauthorizedException(' email ou senha invalida');
        }

       const payLoad = {
        sub: user.id,
        nome: user.nome,
        email: user.email,
       }

       const accessToken = await this.jwtService.signAsync(payLoad);

       console.log('usuario logado com sucesso', user.id);

       const { password, ...userWthoutPassword} = user;
         return {
            message: 'Login realizado com sucesso',
            accessToken: accessToken,
            user: userWthoutPassword
          }

   }
}
