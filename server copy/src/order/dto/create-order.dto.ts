import { Type } from 'class-transformer';
import { CreateShippingDto } from './create-shipping.dto';
import { ValidateNested } from 'class-validator';
import { OrderedProductsDto } from './ordered-products.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @Type(() => CreateShippingDto)
  @ValidateNested()
  shippingAddress: CreateShippingDto;
  
  @ApiProperty()
  @Type(() => OrderedProductsDto)
  @ValidateNested()
  orderedProducts: OrderedProductsDto[];
}