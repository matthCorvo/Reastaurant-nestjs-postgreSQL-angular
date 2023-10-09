import {
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { FoodEntity } from '../food/entities/food.entity';
import { FoodService } from '../food/food.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly opRepository: Repository<OrdersProductsEntity>,
    @Inject(forwardRef(() => FoodService))
    private readonly foodService: FoodService,
  ) {}
  async create(
    createOrderDto: CreateOrderDto,
    currentUser: UserEntity,
  ): Promise<OrderEntity> {
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity, createOrderDto.addressLatLng);

    const orderEntity = new OrderEntity();
    orderEntity.addressLatLng = shippingEntity;
    orderEntity.user = currentUser;

    const orderSave = await this.orderRepository.save(orderEntity);

    const opEntity: {
      order: OrderEntity;
      food: FoodEntity;
      quantity: number;
      price: number;
    }[] = [];

    for (let i = 0; i < createOrderDto.orderedProducts.length; i++) {
      const order = orderSave;
      const food = await this.foodService.findById(
        createOrderDto.orderedProducts[i].id,
      );
      const quantity = createOrderDto.orderedProducts[i].quantity;
      const price = createOrderDto.orderedProducts[i].price;
      opEntity.push({
        order,
        food,
        quantity,
        price,
      });
    }

    const op = await this.opRepository
      .createQueryBuilder()
      .insert()
      .into(OrdersProductsEntity)
      .values(opEntity)
      .execute();

    return await this.findOne(orderSave.id);
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: {
        addressLatLng: true,
        user: true,
        foods: { food: true },
      },
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: {
        addressLatLng: true,
        user: true,
        foods: { food: true },
      },
    });
  }

  async findOneByProductId(id: number) {
    return await this.opRepository.findOne({
      relations: { food: true },
      where: { food: { id: id } },
    });
  }

  // async update(
  //   id: number,
  //   updateOrderStatusDto: UpdateOrderStatusDto,
  //   currentUser: UserEntity,
  // ) {
  //   let order = await this.findOne(id);
  //   if (!order) throw new NotFoundException('Order not found');

  //   if (
  //     order.status === OrderStatus.DELIVERED ||
  //     order.status === OrderStatus.CANCELED
  //   ) {
  //     throw new BadRequestException(`Order already ${order.status}`);
  //   }
  //   if (
  //     order.status === OrderStatus.PAYED &&
  //     updateOrderStatusDto.status != OrderStatus.SHIPPED
  //   ) {
  //     throw new BadRequestException(`Delivery before shipped !!!`);
  //   }
  //   if (
  //     updateOrderStatusDto.status === OrderStatus.SHIPPED &&
  //     order.status === OrderStatus.SHIPPED
  //   ) {
  //     return order;
  //   }
  //   if (updateOrderStatusDto.status === OrderStatus.SHIPPED) {
  //     order.shippedAt = new Date();
  //   }
  //   if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
  //     order.deliveredAt = new Date();
  //   }
  //   order.status = updateOrderStatusDto.status;
  //   order.updatedBy = currentUser;
  //   order = await this.orderRepository.save(order);
  //   if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
  //     await this.stockUpdate(order, OrderStatus.DELIVERED);
  //   }
  //   return order;
  // }

  // async cancelled(id: number, currentUser: UserEntity) {
  //   let order = await this.findOne(id);
  //   if (!order) throw new NotFoundException('Order Not Found.');

  //   if (order.status === OrderStatus.CANCELED) return order;

  //   order.status = OrderStatus.CANCELED;
  //   order = await this.orderRepository.save(order);
  //   await this.stockUpdate(order, OrderStatus.CANCELED);
  //   return order;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

}
