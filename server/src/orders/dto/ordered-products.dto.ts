import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreateFoodDto } from '../../food/dto/create-food.dto';
import { Type } from 'class-transformer';
import { CreateOrderDto } from './create-order.dto';
import { FoodEntity } from 'src/food/entities/food.entity';

export class OrderedProductsDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive({ message: 'Le prix ne peut pas être négatif.' })
  price: number;

  @ApiProperty()
  @IsNumber({}, { message: 'La quantité doit être un nombre' })
  @IsPositive({ message: 'La quantité ne peut pas être négative.' })
  quantity: number;

  @ApiProperty()
  @IsNumber({}, { message: 'La quantité doit être un nombre' })
  @IsPositive({ message: 'La quantité ne peut pas être négative.' })
  food: number;


}
