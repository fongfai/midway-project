import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { User } from './User.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column()
  description: string;

  @OneToOne(type => User, user => user.profile, {
    onDelete: 'SET NULL',
  })
  user: User;
}
