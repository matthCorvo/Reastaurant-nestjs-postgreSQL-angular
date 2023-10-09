import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto'; // Vérifiez le chemin d'importation

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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

}
