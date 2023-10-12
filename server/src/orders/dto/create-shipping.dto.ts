import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShippingDto {
  @ApiProperty()
  @IsString({ message: 'doit être une chaîne de caractères' })
  lng: string;

  @ApiProperty()
  @IsString({ message: 'doit être une chaîne de caractères' })
  lat: string;

}
