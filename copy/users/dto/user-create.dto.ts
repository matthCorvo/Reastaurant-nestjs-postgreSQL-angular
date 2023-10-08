import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserLoginDto } from './user-login.dto';

export class CreateUserDto extends UserLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  adresse: string;

}