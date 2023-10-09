import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLatLngDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lng: string;

}
