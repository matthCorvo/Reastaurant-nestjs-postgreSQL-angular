import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateOrderDto } from './create-order.dto';

export class LatLngDto {
  @ApiProperty()
  lng: number;

  @ApiProperty()
  lat: number;

}
