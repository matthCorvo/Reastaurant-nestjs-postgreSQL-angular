import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { FoodEntity } from '../../food/entities/food.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Order } from './order.entity';

@Entity({ name: 'orderItem' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0,  })
  price: number;

  @Column('integer', { nullable: true })
  quantity: number;

  // plusieurs commandes peuvent être associées à un utilisateur
  @ManyToOne(() => FoodEntity, (food) => food.order)
  food: FoodEntity;

}