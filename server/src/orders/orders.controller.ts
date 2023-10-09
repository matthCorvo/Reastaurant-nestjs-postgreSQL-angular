import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @UseGuards(AuthenticationGuard)
  @Post('create')
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() currentUser: UserEntity,
  ): Promise<OrderEntity> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return await this.ordersService.findOne(+id);
  }

  // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  //   @CurrentUser() currentUser: UserEntity,
  // ) {
  //   return await this.ordersService.update(
  //     +id,
  //     updateOrderStatusDto,
  //     currentUser,
  //   );
  // }

  // @Put('cancel/:id')
  // // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  // async cancelled(
  //   @Param('id') id: string,
  //   @CurrentUser() currentUser: UserEntity,
  // ) {
  //   return await this.ordersService.cancelled(+id, currentUser);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
