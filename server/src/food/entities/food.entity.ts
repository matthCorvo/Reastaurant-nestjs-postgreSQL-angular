// import { OrdersProductsEntity } from '../../order/entities/orders-products.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'food' })
// Crée l'entité des kebabs.
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Crée le nom du kebab
  @Column()
  name: string;

  // Crée le prix du kebab.
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  // Crée l'image du kebab
  @Column()
  imageUrl: string;

  // Crée la description du kebab
  @Column()
  description: string;
}
