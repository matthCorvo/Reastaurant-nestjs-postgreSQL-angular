import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './enums/order-status.enum';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(
    public ordersService: OrdersService,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) 

  {}
 
  @Post('create')
  createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return this.ordersService.createOrder(createOrderDto, userId);
  
  }
  
  

@Get('newOrderForCurrentUser')
async getNewOrderForCurrentUser(@Req() req): Promise<OrderEntity> {
  const userId = req.user.id;
  return this.ordersService.getNewOrderForCurrentUser(userId);

}

@Post('pay')
async pay(@Req() req) {
  const order = await this.ordersService.getNewOrderForCurrentUser(req.user.id);

  if (!order) {
    throw new Error('Order Not Found!');
  }

  order.paymentId = true;
  order.status = OrderStatus.PAYED;
  await this.ordersService.saveOrder(order);

  return order.id;
}



@Get('track/:id')
async trackOrder(@Param('id') id: number) {
  return await this.orderRepository.findOne({where: {id : id}});
}

}
