import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { DeepPartial, Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { FoodEntity } from '../food/entities/food.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ShippingEntity } from './entities/shipping.entity';
import { FoodService } from '../food/food.service';
import { OrderedProductsDto } from './dto/ordered-products.dto';
import { UserService } from '../users/users.service';

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
      relations: ['orderedProducts', 'addressLatLng'],
    });
  }
  
  // Suggestion 2
//   create(orderAttr: Partial<OrderEntity>) {
//     const order = this.orderRepository.create(orderAttr);
//     return this.orderRepository.save(order);
// }

async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<OrderEntity> {
  console.log('createOrderDto', createOrderDto);

  const newOrder = new OrderEntity();
  newOrder.userId = userId;
  newOrder.totalPrice = createOrderDto.totalPrice;
  newOrder.name = createOrderDto.name;
  newOrder.adresse = createOrderDto.adresse;

  // ... other property assignments

  const orderProducts = createOrderDto.orderProducts.map((orderedProduct) => {
    const orderedProductEntity = new OrdersProductsEntity();
    orderedProductEntity.price = orderedProduct.price;
    orderedProductEntity.quantity = orderedProduct.quantity;
    orderedProductEntity.order = newOrder;
    orderedProductEntity.food.id = orderedProduct.food;
    return orderedProductEntity;
  });

  newOrder.orderProducts = orderProducts;

  console.log('order', newOrder);

  return this.orderRepository.save(newOrder);
}

  async deleteOrder(id: number): Promise<void> {
    await this.ordersProductsRepository.delete(id);
  }

  async getNewOrderForCurrentUser(userId: number): Promise<OrderEntity> {
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
