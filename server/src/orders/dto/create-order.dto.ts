import { Type } from 'class-transformer';
import { CreateShippingDto } from './create-shipping.dto';
import { IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from 'class-validator';
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
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  userId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Adresse ne peut être vide' })
  @IsString({ message: 'Adresse doit être une chaîne de caractères' })
  adresse: string;

  // @ApiProperty()
  // @IsNotEmpty({ message: 'paymentId ne peut être vide' })
  // @IsString({ message: 'paymentId doit être une chaîne de caractères' })
  // paymentId: string;

  @ApiProperty({ type: () => CreateShippingDto })
  @ValidateNested()
  addressLatLng: CreateShippingDto;

  @ApiProperty({ type: () => OrderedProductsDto })
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @IsNotEmptyObject({ nullable: false }, { each: true })
  @Type(() => OrderedProductsDto)
  orderProducts: OrderedProductsDto[];
}
