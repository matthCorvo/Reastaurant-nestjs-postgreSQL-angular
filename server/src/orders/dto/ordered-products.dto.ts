import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { CreateFoodDto } from 'src/food/dto/create-food.dto';
import { Type } from 'class-transformer';

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
  @IsNotEmpty({ message: 'Ne peut pas être vide' })
  id: number;

  @ApiProperty()
  @Type(() => CreateFoodDto)
  @ValidateNested()
  food: CreateFoodDto[];
}
