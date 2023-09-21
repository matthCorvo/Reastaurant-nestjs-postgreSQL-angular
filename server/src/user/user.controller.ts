import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../utils/user-roles.enum';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from '../utils/decorators/current-user.decorator';
import { AuthenticationGuard } from '../utils/guards/authentification.guard';
import { AuthorizeGuard } from '../utils/guards/authorization.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * inscription d'un utilisateur.
   *
   * @param {UserSignUpDto} userSignUpDto - Les données de l'utilisateur à inscrire.
   * @returns {Promise<{ user: UserEntity }>} - L'utilisateur inscrit.
   */
  @Post('signup')
  async signup( @Body() userSignUpDto: UserSignUpDto
  ): Promise<{ user: UserEntity }> {
    return { user: await this.userService.signup(userSignUpDto) };
  }

  /**
   * authentification d'un utilisateur.
   *
   * @param {UserSignInDto} userSignInDto - Les données de l'utilisateur à authentifier.
   * @returns {Promise<{ accessToken: string; user: UserEntity }>} - L'utilisateur authentifié et le token d'accès JWT.
   */
  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.userService.signin(userSignInDto);
    // Appel de la méthode 'accessToken' du service 'UserService' pour générer un token d'accès JWT.
    const accessToken = await this.userService.accessToken(user);
    // Retourne un objet contenant le token d'accès JWT et les informations de l'utilisateur authentifié.
    return { accessToken, user };
  }

  /**
   * récupére tous les utilisateurs.
   *
   * @returns {Promise<UserEntity[]>} - La liste de tous les utilisateurs.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  /**
   * récupére un utilisateur par son ID.
   *
   * @param {string} id - L'ID de l'utilisateur à récupérer.
   * @returns {Promise<UserEntity>} - L'utilisateur trouvé.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard)
  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOne(+id);
  }

  /**
   * supprimer un utilisateur par son ID.
   *
   * @param {number} id - L'ID de l'utilisateur à supprimer.
   * @returns {Promise<void>} - Rien (void).
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.delete(+id);
  }

  /**
   * récupére le profil de l'utilisateur authentifié.
   *
   * @param {UserEntity} currentUser - L'utilisateur authentifié (injecté via le décorateur @CurrentUser).
   * @returns {UserEntity} - Le profil de l'utilisateur authentifié.
   */
  @ApiSecurity('JWT-auth') // Swagger api
  @UseGuards(AuthenticationGuard)
  @Get('profile')
  async getProfile(@CurrentUser() currentUser: UserEntity): Promise<UserEntity> {
    return currentUser;
  }
}
