import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('devrait inscrire un nouvel utilisateur', async () => {
      // Données de test
      const userSignUpDto: UserSignUpDto = {
        name: 'user',
        email: 'test@example.com',
        password: 'motdepasse'
      };

      const expectedUser: UserEntity = {
        id: 1,
        ...userSignUpDto,
        roles: [],
        orders: []
      };

      jest.spyOn(userService, 'signup').mockResolvedValue(expectedUser);

      const result = await controller.signup(userSignUpDto);

      expect(result).toEqual({ user: expectedUser });
    });
  });

  describe('signin', () => {
    it('devrait authentifier un utilisateur', async () => {

        const userSignInDto: UserSignInDto = {
        email: 'test@example.com',
        password: 'motdepasse'
      };

      const expectedUser: UserEntity = {
        id: 1, 
        name: 'user',
        email: 'test@example.com',
        password: 'motdepasse',
        roles: [],
        orders: [] 
      };

      jest.spyOn(userService, 'signin').mockResolvedValue(expectedUser);

      jest.spyOn(userService, 'accessToken').mockResolvedValue('jeton-d-acces');

      const result = await controller.signin(userSignInDto);

      expect(result).toEqual({
        accessToken: 'jeton-d-acces',
        user: expectedUser
      });
    });
  })

});
