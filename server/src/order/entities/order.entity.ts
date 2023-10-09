import { UserEntity } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { ShippingEntity } from './shipping.entity';
import { OrdersProductsEntity } from './orders-products.entity';
import { FoodEntity } from 'src/food/entities/food.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from './order_status.enum';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @IsNotEmpty({ message: 'ne peut être vide' })
  @IsString({ message: 'doit être une chaîne de caractères' })
  adresse: string;

  // plusieurs commandes peuvent être associées à un utilisateur
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  // plusieurs commandes peuvent être associées à un utilisateur
  @ManyToOne(() => FoodEntity, (food) => food.order)
  food: FoodEntity;
}