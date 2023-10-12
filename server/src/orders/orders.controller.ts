import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ReqUser,
  HttpStatus,
  HttpException,
  InternalServerErrorException
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { OrderedProductsDto } from './dto/ordered-products.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Get()
  async getAllOrders(): Promise<OrderEntity[]> {
    return this.ordersService.getAllOrders();
  }

  @Post('create')
  async createOrder(
    @ReqUser() user: UserEntity | null,
    @Body() body: CreateOrderDto,
  ): Promise<OrderEntity> {
    return await this.ordersService.createOrder(user?.id ?? null, body);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }

  @Get('newOrderForCurrentUser')
  async getNewOrderForCurrentUser(userId: string): Promise<any> {
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
