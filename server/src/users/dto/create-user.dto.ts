import { IsNotEmpty, IsString, IsEmail, IsArray, ArrayUnique, ArrayNotEmpty  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../entities/user-roles.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email ne peut être vide' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  adresse: string;

//   @ApiProperty()
//   @IsArray()
//   @ArrayUnique()
//   @ArrayNotEmpty()
//   role: Roles[];
}