import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto  {
  @ApiProperty()
  @IsNotEmpty({ message: "L'email ne peut être vide" })
  @IsEmail({}, { message: 'Veuillez fournir une adresse électronique valide' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: ' Le mot de passe ne peut être vide ' })
  @MinLength(5, {
    message: 'Le nombre de caractères du mot de passe doit être au minimum de 5'
  })
  password: string;
}