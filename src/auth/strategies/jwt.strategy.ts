import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret-key',
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;
    
    // Buscar usuário no banco para verificar se ainda existe e está ativo
    const user = await this.userService.findById(userId);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Acesso negado');
    }
    
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role
    };
  }
}
