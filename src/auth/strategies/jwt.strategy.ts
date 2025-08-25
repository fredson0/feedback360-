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
    console.log('🔍 Token recebido para validação:', { userId: payload.sub, email: payload.email });
    
    const userId = payload.sub;
    
    try {
      
      console.log('🔎 Verificando usuário no banco de dados:', userId);
      const user = await this.userService.findById(userId);

      if (!user) {
        console.log('❌ Usuário não encontrado:', userId);
        throw new UnauthorizedException('Usuário não encontrado');
      }

      if (!user.isActive) {
        console.log('❌ Usuário inativo:', userId);
        throw new UnauthorizedException('Conta desativada');
      }

      console.log('✅ Token validado com sucesso para:', { userId: user.id, email: user.email });
      
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role
      };
    } catch (error) {
      console.log('🚨 Erro na validação do token:', error.message);
      throw new UnauthorizedException('Acesso negado');
    }
  }
}
