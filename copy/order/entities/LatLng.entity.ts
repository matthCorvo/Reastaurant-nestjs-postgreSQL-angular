import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Order } from './order.entity';

@Entity({ name: 'LatLng' })
export class LatLng {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: true })
  lat: string;

  @Column('varchar', { nullable: true })
  lng: string;

  @ManyToOne(() => Order, (order) => order.adresseLatLng)
  order: Order;
}