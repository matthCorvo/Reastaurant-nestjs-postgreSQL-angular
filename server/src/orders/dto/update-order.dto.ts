import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../enums/order-status.enum';
import { IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsEnum(OrderStatus)
    @ApiPropertyOptional({
        enum: OrderStatus,
        description: `order status. One of three values ${OrderStatus.NEW}, ${OrderStatus.PAYED}, ${OrderStatus.SHIPPED}, ${OrderStatus.CANCELED}, ${OrderStatus.REFUNDED}`,
        examples: [
            OrderStatus.NEW,
            OrderStatus.PAYED,
            OrderStatus.SHIPPED,
            OrderStatus.CANCELED,
            OrderStatus.REFUNDED,
        ],
    })
    status: OrderStatus;  
}
