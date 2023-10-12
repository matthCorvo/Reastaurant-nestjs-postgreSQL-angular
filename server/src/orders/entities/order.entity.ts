import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { ShippingEntity } from './shipping.entity';
import { OrdersProductsEntity } from './orders-products.entity';
import { FoodEntity } from 'src/food/entities/food.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    array: true,
    default: [OrderStatus.NEW],
  })
  status: OrderStatus[];

  @Column('integer', { nullable: false })
  totalPrice: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  userId: number;
  
  @Column('varchar', { nullable: false })
  adresse: string;

  @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
  @JoinColumn()
  addressLatLng: ShippingEntity;

  @OneToMany(() => OrdersProductsEntity, (orderProduct) => orderProduct.order, { cascade: true })
  orderProducts: OrdersProductsEntity[];


}
