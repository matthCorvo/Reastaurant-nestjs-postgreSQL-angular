import { IsArray, IsNotEmpty, IsString, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFoodDto } from '../../food/dto/create-food.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { FoodEntity } from 'src/food/entities/food.entity';

export class CreateOrderItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodEntity)
  food: FoodEntity[];

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
  
}
