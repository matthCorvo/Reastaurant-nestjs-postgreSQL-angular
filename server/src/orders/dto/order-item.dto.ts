import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { FoodEntity } from 'src/food/entities/food.entity';
import { CreateOrderDto } from './create-order.dto';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';
import { OrderEntity } from '../entities/order.entity';

export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;


  @ApiProperty()
  food: CreateFoodDto;
}