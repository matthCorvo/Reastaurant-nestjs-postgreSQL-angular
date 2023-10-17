import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FoodEntity } from '../../food/entities/food.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0  })
  public price: number;

  @Column('integer', { nullable: true })
  public quantity: number;

  @ManyToOne(() => FoodEntity, (food) => food.orderItems)
  @JoinColumn()
  food: FoodEntity;


}
