import { UserEntity } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { ShippingEntity } from './shipping.entity';
import { OrdersProductsEntity } from './orders-products.entity';
import { FoodEntity } from 'src/food/entities/food.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from './order_status.enum';

@Entity({ name: 'orderItem' })
export class OrdeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  // plusieurs commandes peuvent être associées à un utilisateur
  @ManyToOne(() => FoodEntity, (food) => food.order)
  food: FoodEntity;
}