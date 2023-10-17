import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './enums/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { LatLngEntity } from './entities/LatLng.entity';
import { OrderItemEntity } from './entities/orders-items.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    private latLngEntity: LatLngEntity,
    private orderItemEntity: OrderItemEntity,
  ) {}
  
  async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<OrderEntity> {
    await this.deleteExistingOrders(userId);
  
    const newOrder = await this.createOrderEntity(createOrderDto, userId);
    const savedOrder = await this.orderRepository.save(newOrder);
  
    // savedOrder.addressLatLng = newOrder.addressLatLng;
    await this.orderRepository.save(savedOrder);
  
    return savedOrder;
  }

    
  async createOrderEntity(createOrderDto: CreateOrderDto, userId: number): Promise<OrderEntity> {
    const order = new OrderEntity();
    // Map the properties from the DTO to the entity
    order.name = createOrderDto.name;
    order.adresse = createOrderDto.adresse;
    order.totalPrice = createOrderDto.totalPrice;
    order.user = { id: userId } as UserEntity;
    order.addressLatLng = createOrderDto.addressLatLng as LatLngEntity;
  
    // const orderItems = plainToInstance(OrderItemEntity, createOrderDto.orderItems);
    order.orderItems = createOrderDto.orderItems as OrderItemEntity[];
   // Save the order with the updated order items
   const updatedOrder = await this.orderRepository.save(order);

   return updatedOrder;
}


  
   private async deleteExistingOrders(userId: number): Promise<void> {
    if (!userId) {
      throw new Error('User ID is undefined');
    }
  
    await this.orderRepository.delete({
      user: { id: userId },
      status: OrderStatus.NEW,
    });
  }


  async getNewOrderForCurrentUser(userId: number): Promise<OrderEntity> {
    return this.orderRepository.findOne({
      where: { user: { id: userId }, status: OrderStatus.NEW },
    });
  }

  async saveOrder(order: OrderEntity): Promise<OrderEntity> {
    return this.orderRepository.save(order);
  }


}
