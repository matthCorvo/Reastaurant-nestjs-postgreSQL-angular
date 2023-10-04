import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le numéro de téléphone ne peut pas être vide.' })
  @IsString({ message: 'Le format du numéro de téléphone doit être une chaîne de caractères.' })
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Le format du nom doit être une chaîne de caractères.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: "'L'adresse ne peut pas être vide. " })
  @IsString({ message: "Le format de l'adresse doit être une chaîne de caractères." })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La ville ne peut pas être vide.' })
  @IsString({ message: 'Le format de la ville doit être une chaîne de caractères.' })
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le code postal ne peut pas être vide.' })
  @IsString({ message: 'Le format du code postal doit être une chaîne de caractères.' })
  postCode: string;

  @ApiProperty()
  @IsNotEmpty({ message: "L'état ne peut pas être vide." })
  @IsString({ message: "Le format de l'état doit être une chaîne de caractères." })
  state: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le pays ne peut pas être vide.' })
  @IsString({ message: 'Le format du pays doit être une chaîne de caractères.' })
  country: string;
}