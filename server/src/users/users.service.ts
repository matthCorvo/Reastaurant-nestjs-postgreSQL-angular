import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    // Hash the password before saving it
    const saltRounds = 10; // You can configure the number of salt rounds
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(createUserDto.password, salt);    user.adresse = createUserDto.adresse;
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