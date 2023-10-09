import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShippingDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Ne peut pas être vide.' })
  @IsString({ message: 'doit être une chaîne de caractères' })
  lng: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Ne peut pas être vide.' })
  @IsString({ message: 'doit être une chaîne de caractères' })
  lat: string;

}
