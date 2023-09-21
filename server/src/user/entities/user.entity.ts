import { OrderEntity } from '../../order/entities/order.entity';
import { Roles } from '../../utils/user-roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Nom de l'utilisateur
  @Column()
  name: string;

  // Adresse e-mail de l'utilisateur (unique)
  @Column({ unique: true })
  email: string;

  // Mot de passe de l'utilisateur (non inclus dans les sélections par défaut)
  @Column({ select: false })
  password: string;

  // Rôle de l'utilisateur (par défaut: USER)
  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  // un utilisateur peur avoir plusieur commande
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
