import { PartialType } from '@nestjs/swagger';
import { CreateFoodDto } from './create-food.dto';
import { IsString, IsInt } from 'class-validator';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsString()
  imageUrl: string;

  @IsString()
  description: string;
}
