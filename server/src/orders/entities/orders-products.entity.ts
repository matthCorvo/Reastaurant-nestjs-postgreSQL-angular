import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { FoodEntity } from '../../food/entities/food.entity';

@Entity({ name: 'orders_products' })
export class OrdersProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0  })
  price: number;

  @Column('integer', { nullable: true })
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  order: OrderEntity;

  @ManyToOne(() => FoodEntity)
  food: FoodEntity;
}
