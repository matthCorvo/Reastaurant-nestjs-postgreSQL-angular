import { IsNotEmpty, IsString, MinLength } from 'class-validator';
// import { UserSignInDto } from "./user-signin.dto";
import { ApiProperty } from '@nestjs/swagger';
import { UserSignInDto } from './user-signin.dto';

export class UserSignUpDto extends UserSignInDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  // @ApiProperty()
  // @IsNotEmpty({ message: 'Le numéro de téléphone ne peut être vide' })
  // @MinLength(10, {
  //   message:
  //     'erreur dans votre numero de telephone, il doit être au minimum de 10'
  // })
  // phone: string;
}
