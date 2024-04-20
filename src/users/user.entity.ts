import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from './photo.entity';

@Index('IDX_78a916df40e02a9deb1c4b75ed', ['username'], { unique: true })
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;
}
