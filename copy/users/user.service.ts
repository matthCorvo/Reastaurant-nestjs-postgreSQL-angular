import { BadRequestException, HttpException, UnauthorizedException,  HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import { hash, compare } from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { sign } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  /**
   * Service de gestion des utilisateurs.
   *
   * @constructor
   * @param {Repository<UserEntity>} userRepository - Repository de l'entité UserEntity.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
 
  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }
}