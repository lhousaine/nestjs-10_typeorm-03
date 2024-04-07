import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column('int', { name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(type => User, user => user.photos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
