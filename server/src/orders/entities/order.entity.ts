import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { LatLngEntity } from './LatLng.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderItemEntity } from './orders-items.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.NEW,
  })
  public status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  public totalPrice: number;

  @Column('varchar')
  public name: string;

  @Column()
  public paymentId: boolean = false;

  @Column('varchar')
  public adresse: string;

  @OneToOne(() => LatLngEntity, { cascade: true, eager: true })
  @JoinColumn()
  public addressLatLng: LatLngEntity;

  @ManyToOne(() => UserEntity, (user) => user.order)
  public user: UserEntity;

  @OneToOne(() => OrderItemEntity, { eager: true })
  @JoinColumn()
  orderItems: OrderItemEntity[];
}
