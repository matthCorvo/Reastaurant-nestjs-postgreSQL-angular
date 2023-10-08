import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { UserService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.findUserByEmail(email);
    if (user && user.password == password) return user;
    if (user == undefined)
      throw new UnauthorizedException('Utilisateur introuvable : ' + email);
    if (user.password != password)
      throw new UnauthorizedException('Mot de passe non valide');
  }
}