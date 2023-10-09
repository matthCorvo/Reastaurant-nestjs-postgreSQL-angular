import { Controller, Post, Body, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from '../users/entities/user.entity'; // Adjust the import path as needed
import { JwtAuthGuard } from '../auth/guard/jwt.guard'; // Add authentication guard if required
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto, // Use your DTO if available
    @Req() req, // Use the Request object to access user information
  ) {
    // Get the user from the request object (assuming user information is attached to the request)
    const user = req.user;

    const newOrder = await this.orderService.createOrder(createOrderDto, user);
    return newOrder;
  }

  // @Get(':userId')
  // @UseGuards(JwtAuthGuard) // Apply authentication guard if required
  // async listOrdersByUser(@Param('userId', ParseIntPipe) userId: number) {
  //   const orders = await this.orderService.listOrdersByUser(userId);
  //   if (!orders) {
  //     throw new NotFoundException('No Orders Found');
  //   }
  //   return orders;
  // }

  // @Post()
  // async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
  //   // Assuming your custom @User() decorator sets the user on the request object
  //   const user = req.user;
  //   return this.orderService.createOrder(createOrderDto, user);
  // }
}
