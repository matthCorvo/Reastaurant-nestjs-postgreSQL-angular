import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Req,
  InternalServerErrorException
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { OrderedProductsDto } from './dto/ordered-products.dto';
import { UserEntity } from '../users/entities/user.entity';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Get()
  async getAllOrders(): Promise<OrderEntity[]> {
    return this.ordersService.getAllOrders();
  }

  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req): Promise<OrderEntity> {
    const userId = req.user.id; // Assuming you have the user ID stored in the req.user object
    return this.ordersService.createOrder(createOrderDto, userId);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }

  @Get('newOrderForCurrentUser')
  async getNewOrderForCurrentUser(userId: number): Promise<any> {
    try {
      const order = await this.ordersService.getNewOrderForCurrentUser(userId);
      if (order) {
        return order;
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No new order found',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }
}
