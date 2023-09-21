import { IsString, IsNumber, IsNotEmpty, IsPositive, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'le titre ne peut pas être vide.' })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'le prix ne doit pas être vide' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Le prix doit être un nombre et une précision décimale maximale 2'
    }
  )
  @IsPositive()
  price: number;

  // @ApiProperty()
  // @IsObject({ message: 'Les options doivent être un objet JSON valide.' })
  // options: Record<string, any>; // Use a generic object type for options
}
