import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'shippings' })
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: true })
  lat: string;

  @Column('varchar', { nullable: true })
  lng: string;

  @OneToOne(() => OrderEntity, (order) => order.addressLatLng)
  order: OrderEntity;
}
