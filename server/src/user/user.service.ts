import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

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
    private readonly userRepository: Repository<UserEntity>
  ) {}

   /**
   * Inscrit un nouvel utilisateur.
   *
   * @param {UserSignUpDto} userSignUpDto - Les données de l'utilisateur à inscrire.
   * @returns {Promise<UserEntity>} - L'utilisateur créé.
   * @throws {BadRequestException} - Si l'email est déjà pris.
   */
  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    // Vérifie si l'email est déjà utilisé
    const userExists = await this.findUserByEmail(userSignUpDto.email);
    if (userExists) {
      throw new BadRequestException("L'email n'est pas disponible.");
    }
    // Hache le mot de passe avant de le stocker
    userSignUpDto.password = await hash(userSignUpDto.password, 10);

    // Crée l'entité utilisateur
    let user = this.userRepository.create(userSignUpDto);

    // Sauvegarde l'utilisateur dans la base de données
    user = await this.userRepository.save(user);

    // Supprime le mot de passe de l'utilisateur avant de le renvoyer
    delete user.password;
    return user;
  }


  /**
   * Authentifie un utilisateur.
   *
   * @param {UserSignInDto} userSignInDto - Les données de l'utilisateur à authentifier.
   * @returns {Promise<UserEntity>} - L'utilisateur authentifié.
   * @throws {BadRequestException} - Si les identifiants sont incorrects.
   */
  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    // Récupère l'utilisateur avec le mot de passe depuis la base de données
    const userExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();

    // Si l'utilisateur n'existe pas, lance une exception
    if (!userExists) {
      throw new BadRequestException('Identifiants incorrects.');
    }

    // Vérifie si le mot de passe fourni correspond au mot de passe stocké
    const matchPassword = await compare(
      userSignInDto.password,
      userExists.password
    );

    // Si les mots de passe ne correspondent pas, lance une exception
    if (!matchPassword) {
      throw new BadRequestException('Identifiants incorrects.');
    }

    // Supprime le mot de passe de l'utilisateur avant de le renvoyer
    delete userExists.password;
    return userExists;
  }

  /**
   * Récupère tous les utilisateurs.
   *
   * @returns {Promise<UserEntity[]>} - La liste de tous les utilisateurs.
   */
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  /**
   * Récupère un utilisateur par son ID.
   *
   * @param {number} id - L'ID de l'utilisateur à récupérer.
   * @returns {Promise<UserEntity>} - L'utilisateur trouvé.
   * @throws {NotFoundException} - Si l'utilisateur n'est pas trouvé.
   */
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    // Si l'utilisateur n'est pas trouvé, lance une exception
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    return user;
  }

  /**
   * Récupère un utilisateur par son adresse email.
   *
   * @param {string} email - L'adresse email de l'utilisateur à récupérer.
   * @returns {Promise<UserEntity>} - L'utilisateur trouvé ou null s'il n'existe pas.
   */
  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  /**
   * Supprime un utilisateur par son ID.
   *
   * @param {number} id - L'ID de l'utilisateur à supprimer.
   * @returns {Promise<void>} - Rien (void).
   */
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   * Génère un token d'accès JWT pour un utilisateur.
   *
   * @param {UserEntity} user - L'utilisateur pour lequel générer le token.
   * @returns {Promise<string>} - Le token JWT généré.
   */
  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );
  }
}
