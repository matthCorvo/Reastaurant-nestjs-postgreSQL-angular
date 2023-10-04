
import { UserEntity } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { ShippingEntity } from './shipping.entity';
import { OrdersProductsEntity } from './orders-products.entity';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderAt: Timestamp;

  // plusieurs commande peuvent être associés à un kebab
  @OneToMany(() => OrdersProductsEntity, (op) => op.order, { cascade: true })
  products: OrdersProductsEntity[];

  // une commande est associée à une adresse de livraison
  @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
  @JoinColumn()
  shippingAddress: ShippingEntity;

  // plusieurs commandes peuvent être associées à un utilisateur
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
