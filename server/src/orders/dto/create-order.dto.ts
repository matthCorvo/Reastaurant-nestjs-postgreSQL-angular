import { Type } from 'class-transformer';
import { CreateShippingDto } from './create-shipping.dto';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { OrderedProductsDto } from './ordered-products.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Adresse ne peut être vide' })
  @IsString({ message: 'Adresse doit être une chaîne de caractères' })
  adresse: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'paymentId ne peut être vide' })
  @IsString({ message: 'paymentId doit être une chaîne de caractères' })
  paymentId: string;

  @ApiProperty()
  @Type(() => CreateShippingDto)
  @ValidateNested()
  addressLatLng: CreateShippingDto;

  @ApiProperty()
  @Type(() => OrderedProductsDto)
  @ValidateNested()
  orderedProducts: OrderedProductsDto[];
}
