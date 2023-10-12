import { OrderEntity } from '../../orders/entities/order.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './user-roles.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Nom de l'utilisateur
  @Column()
  name: string;

  // Adresse de l'utilisateur
  @Column()
  adresse: string;

  // Adresse e-mail de l'utilisateur (unique)
  @Column({ unique: true })
  email: string;

  // Mot de passe de l'utilisateur (non inclus dans les sélections par défaut)
  @Column()
  password: string;

  // Rôle de l'utilisateur (par défaut: USER)
  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  role: Roles[];

  //  @OneToMany(() => OrderEntity, (order) => order.user)
  // orders: OrderEntity;

}
