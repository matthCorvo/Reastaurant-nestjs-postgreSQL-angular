import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsInt, IsObject } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  title: string;

  @IsInt()
  price: number;

  // @IsObject()
  // options: Record<string, any>; // Use a generic object type for options
}
