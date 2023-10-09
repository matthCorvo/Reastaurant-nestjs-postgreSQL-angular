import { IsArray, IsNotEmpty, IsString, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-orderItem.dto';
import { CreateLatLngDto } from './create-LatLng.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { ManyToOne } from 'typeorm';

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
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLatLngDto)
  adresseLatLng: CreateLatLngDto;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
