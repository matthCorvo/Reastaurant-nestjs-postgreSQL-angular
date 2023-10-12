import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { DeepPartial, Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { FoodEntity } from 'src/food/entities/food.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ShippingEntity } from './entities/shipping.entity';
import { FoodService } from 'src/food/food.service';
import { OrderedProductsDto } from './dto/ordered-products.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  private orders = [];

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly ordersProductsRepository: Repository<OrdersProductsEntity>,
    @InjectRepository(ShippingEntity)
    private readonly shippingRepository: Repository<ShippingEntity>,
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    private readonly foodService: FoodService,
    private readonly userService: UserService,

    ) {}

  async getAllOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      relations: ['orderedProducts', 'orderedProducts.food', 'addressLatLng'],
    });
  }
  
  // Suggestion 2
//   create(orderAttr: Partial<OrderEntity>) {
//     const order = this.orderRepository.create(orderAttr);
//     return this.orderRepository.save(order);
// }

async createOrder(
  userId: number | null,
  orderData: CreateOrderDto,
): Promise<OrderEntity> {
  const order = new OrderEntity();
  if (userId) {
    order.user = await this.userService.findUserById(userId);
  }
  order.order = await this.getItems(order, orderData.order);
  order.name = orderData.name;
  order.adresse = orderData.adresse;
  order.totalPrice = orderData.totalPrice;
  order.userId = orderData.userId;
 
  return this.orderRepository.save(order);
}

private async getItems(orderEntity: OrderEntity, orders: OrderedProductsDto[]) {
  const res = [];
  for (const order of orders) {
    const orderProduct = await this.foodService.findById(
      order.id,
      orderEntity.userId
    );
    res.push({
      orderProduct,
      quantity: order.quantity,
      price: order.price,
    } as OrdersProductsEntity);
  }
  return res;
}



  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async getNewOrderForCurrentUser(userId: string): Promise<OrderEntity> {
    // Use TypeORM to query the database for the new order for the current user.
    
    const order = await this.orderRepository.findOne({
      where: {
        userId,
      },
      relations: ['orderedProducts', 'addressLatLng'],
    });

    return order;
  }
}
