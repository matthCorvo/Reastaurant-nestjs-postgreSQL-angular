import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { LatLng } from './entities/LatLng.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(requestOrder: any, user: UserEntity) {
    // Ensure the cart is not empty
    if (!requestOrder.items || requestOrder.items.length === 0) {
      throw new BadRequestException('Cart Is Empty!');
    }

    // Create a new order and map properties
    const order = new Order();
    order.totalPrice = requestOrder.totalPrice;
    order.name = requestOrder.name;
    order.adresse = requestOrder.adresse;
    order.paymentId = requestOrder.paymentId;

    // Associate the order with the user
    order.user = user;
    // You may need to map the items property separately, depending on your entity structure
    order.orderItems = requestOrder.items;

    // Save the order to the database
    const newOrder = await this.orderRepository.save(order);

    return newOrder;
  }
  // async listOrdersByUser(userId: number) {
  //   const orders = await this.orderRepository
  //     .createQueryBuilder('order')
  //     .where('order.user.id = :userId', { userId })
  //     .leftJoinAndSelect('order.user', 'user')
  //     .leftJoinAndSelect('order.AdresseLatLng', 'AdresseLatLng')
  //     .leftJoinAndSelect('order.orderItems', 'orderItems')
  //     .leftJoinAndSelect('orderItems.food', 'food')
  //     .getMany();

  //   if (!orders || orders.length === 0) {
  //     throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
  //   }
  //   return orders;
  // }

  // async createOrder(
  //   createOrderDto: CreateOrderDto,
  //   id: number, // Assuming you have the user's ID
  // ) {
  //   const user = await this.orderRepository.findOne({ where: { id } });
  
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  
  //   const newOrder = new Order();
  //   newOrder.totalPrice = createOrderDto.totalPrice;
  //   newOrder.name = createOrderDto.name;
  //   newOrder.adresse = createOrderDto.adresse;
  //   newOrder.paymentId = createOrderDto.paymentId;

  //   const savedOrder = await this.orderRepository.save(newOrder);

  //   // Create OrderItems and associate them with the order
  //   const orderItems = createOrderDto.orderItems.map((item) => {
  //     const orderItem = new OrderItem();
  //     orderItem.price = item.price;
  //     orderItem.quantity = item.quantity;
  //     orderItem.food = item.food;
  //     orderItem.order = savedOrder;
  //     return orderItem;
  //   });

  //   await this.orderRepository.save(orderItems);

  //   // Create LatLng and associate it with the order
  //   const adresseLatLng = new LatLng();
  //   adresseLatLng.lat = createOrderDto.adresseLatLng.lat;
  //   adresseLatLng.lng = createOrderDto.adresseLatLng.lng;
  //   adresseLatLng.order = savedOrder;

  //   await this.orderRepository.save(adresseLatLng);

  //   // Calculate and update the total price
  //   const totalPrice = orderItems.reduce((acc, item) => {
  //     return acc + item.price * item.quantity;
  //   }, 0);

  //   savedOrder.totalPrice = totalPrice;
  //   await this.orderRepository.save(savedOrder);

  //   // Refresh the order with populated data
  //   const updatedOrder = await this.orderRepository
  //     .createQueryBuilder('order')
  //     .where('order.id = :orderId', { orderId: savedOrder.id })
  //     .leftJoinAndSelect('order.user', 'user')
  //     .leftJoinAndSelect('order.AdresseLatLng', 'AdresseLatLng')
  //     .leftJoinAndSelect('order.orderItems', 'orderItems')
  //     .leftJoinAndSelect('orderItems.food', 'food')
  //     .getOne();

  //   return updatedOrder;
  // }
}
