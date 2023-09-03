import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  // BaseEntity,
  Entity,
} from 'typeorm';

import { Profile } from './Profile.entity';

import { Post } from './Post.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => Profile, profile => profile.user, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Post, post => post.author, {
    cascade: true,
  })
  posts: Post[];
}
