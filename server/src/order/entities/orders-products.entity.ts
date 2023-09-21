import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: 'orders_products' })
export class OrdersProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  product_unit_price: number;

  @Column()
  product_quantity: number;

  // une commande peuvent être associées à plusieurs kebab  
  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;

  // plusieurs kebab peuvent être associées à une commande
  @ManyToOne(() => ProductEntity, (prod) => prod.products, { cascade: true })
  product: ProductEntity;
}