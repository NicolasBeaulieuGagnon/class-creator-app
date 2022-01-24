import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { User } from '../user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: 'super_secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload) {
    const { name } = payload;
    const user: User = await this.usersRepository.findOne({ name });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
