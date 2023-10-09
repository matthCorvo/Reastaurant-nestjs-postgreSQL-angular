import { UserEntity } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, OneToMany, ManyToOne, JoinColumn, OneToOne, UpdateDateColumn} from 'typeorm';
import { OrderItem } from '../../order/entities/orderItem.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from './order_status.enum';
import { LatLng } from './LatLng.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('integer', { nullable: true })
  totalPrice: number;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  adresse: string;

  @Column('varchar', { nullable: true })
  paymentId: string;

  @ManyToOne(() => UserEntity, (User) => User.orders, {
    cascade: true, // This allows cascading operations (insert, update, delete) on LatLng when working with Order
    })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

  @Column({ name: 'userId' }) // Define the foreign key column name
  userId: UserEntity; // This should now work correctly

    // Rôle de l'utilisateur (par défaut: USER)
    @Column({ type: 'enum', enum: OrderStatus, array: true, default: [OrderStatus.NEW] })
    status: OrderStatus;

    // One-to-One relationship with LatLng
    @ManyToOne(() => LatLng, (latLng) => latLng.order, {
    cascade: true, // This allows cascading operations (insert, update, delete) on LatLng when working with Order
    })
    @JoinColumn()
    adresseLatLng: LatLng;

  //
  @ManyToOne(() => OrderItem, (orderItem) => orderItem.food, {
    cascade: true, // This allows cascading operations (insert, update, delete) on LatLng when working with Order
    })
  orderItems: OrderItem;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}