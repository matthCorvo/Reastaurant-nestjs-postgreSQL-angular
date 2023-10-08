// import {
//     Controller,
//     Get,
//     Post,
//     Body,
//     Param,
//     Delete,
//     ValidationPipe,
//     Req,
//     UseGuards,
//     HttpStatus 
//   } from '@nestjs/common';
//   import { UserService } from './user.service';
//   import { UserEntity } from './entity/user.entity';
//   import { Roles } from './entity/user-roles.enum';
//   import { ApiSecurity, ApiTags } from '@nestjs/swagger';
//   import { CreateUserDto } from './dto/user-create.dto';
//   import { UserLoginDto } from './dto/user-login.dto';
//   import { CurrentUser } from '../utils/decorators/current-user.decorator';
//   import { AuthenticationGuard } from '../auth/guards/authentification.guard';
//   import { AuthorizeGuard } from '../auth/guards/authorization.guard';
//   import { map } from 'rxjs/operators';
//   import { HttpException } from '@nestjs/common';

//   @Controller('user')
//   @ApiTags('User')
//   export class UserController {
//     constructor(private readonly userService: UserService) {}
  
//     // /**
//     //  * inscription d'un utilisateur.
//     //  *
//     //  * @param {CreateUserDto} CreateUserDto - Les données de l'utilisateur à inscrire.
//     //  * @returns {Promise<{ user: UserEntity }>} - L'utilisateur inscrit.
//     //  */
//     // @Post('register')
//     // async register( @Body() createUserDto: CreateUserDto
//     // ): Promise<{ user: UserEntity }> {
//     //   return { user: await this.userService.register(createUserDto) };
//     // }
  
//     /**
//      * authentification d'un utilisateur.
//      *
//      * @param {UserLoginDto} UserLoginDto - Les données de l'utilisateur à authentifier.
//      * @returns {Promise<{ accessToken: string; user: UserEntity }>} - L'utilisateur authentifié et le token d'accès JWT.
//      */
//     // @Post('login')
//     // async signIn(@Body() userLoginDto: UserLoginDto) {
//     //   try {
//     //     const { email, password } = userLoginDto;
//     //     await this.userService.login(email, password);
//     //     // Return a success response if login is successful
//     //     return { message: 'Login successful' };
//     //   } catch (error) {
//     //     // Handle errors and return an appropriate HTTP response
//     //     throw new HttpException(
//     //       { status: HttpStatus.FORBIDDEN, error: 'Login failed' },
//     //       HttpStatus.FORBIDDEN,
//     //     );
//     //   }
//     // }
  

  
//     /**
//      * récupére tous les utilisateurs.
//      *
//      * @returns {Promise<UserEntity[]>} - La liste de tous les utilisateurs.
//      */
//     // @ApiSecurity('JWT-auth') // Swagger api
//     // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
//     // @Get('all')
//     // async findAll(): Promise<UserEntity[]> {
//     //   return await this.userService.findAll();
//     // }
  
//     /**
//      * récupére un utilisateur par son ID.
//      *
//      * @param {string} id - L'ID de l'utilisateur à récupérer.
//      * @returns {Promise<UserEntity>} - L'utilisateur trouvé.
//      */
//     // @ApiSecurity('JWT-auth') // Swagger api
//     // @UseGuards(AuthenticationGuard)
//     // @Get('single/:email')
//     // async findOne(@Param('email') email: string): Promise<UserEntity> {
//     //   return await this.userService.findOne(email);
//     // }
  
//     /**
//      * supprimer un utilisateur par son ID.
//      *
//      * @param {number} id - L'ID de l'utilisateur à supprimer.
//      * @returns {Promise<void>} - Rien (void).
//      */
//     // @ApiSecurity('JWT-auth') // Swagger api
//     // @UseGuards(AuthenticationGuard)
//     // @Delete(':email')
//     // async delete(@Param('email') email: string): Promise<void> {
//     //   await this.userService.delete(email);
//     // }
  
//     /**
//      * récupére le profil de l'utilisateur authentifié.
//      *
//      * @param {UserEntity} currentUser - L'utilisateur authentifié (injecté via le décorateur @CurrentUser).
//      * @returns {UserEntity} - Le profil de l'utilisateur authentifié.
//      */
//     // @ApiSecurity('JWT-auth') // Swagger api
//     // @UseGuards(AuthenticationGuard)
//     // @Get('profile')
//     // async getProfile(@CurrentUser() currentUser: UserEntity): Promise<UserEntity> {
//     //   return currentUser;
//     // }
//   }