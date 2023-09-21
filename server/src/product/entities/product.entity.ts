import { OrdersProductsEntity } from '../../order/entities/orders-products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'product' })
// Crée l'entité des kebabs.
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Crée le nom du kebab
  @Column()
  title: string;

  // Crée le prix du kebab.
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  // @Column('simple-json')
  // options: { name: string; price: number };

  // un kebab peur avoir plusieur commande
  @OneToMany(() => OrdersProductsEntity, (op) => op.product)
  products: OrdersProductsEntity[];
}
