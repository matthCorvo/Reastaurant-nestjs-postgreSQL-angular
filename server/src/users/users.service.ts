import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  create(createUserDto: CreateUserDto) {
    const user: UserEntity = new UserEntity();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.adresse = createUserDto.adresse;
    // user.role = createUserDto.role;
    return this.usersRepository.save(user);
  }

  findUserById(id: number) {
    return this.usersRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}