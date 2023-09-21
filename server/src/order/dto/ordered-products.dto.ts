import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le produit ne peut pas être vide.' })
  id: number;

  @ApiProperty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Le prix doit être un nombre avec une précision décimale maximale de 2.' },
  )
  @IsPositive({ message: 'Le prix ne peut pas être négatif.' })
  product_unit_price: number;

  @ApiProperty()
  @IsNumber({}, { message: 'La quantité doit être un chiffre.' })
  @IsPositive({ message: 'La quantité ne peut pas être négative.' })
  product_quantity: number;
}

