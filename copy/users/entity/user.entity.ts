import { Roles } from './user-roles.enum';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

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
  @Column({ select: false })
  password: string;

  // Rôle de l'utilisateur (par défaut: USER)
  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];


}
