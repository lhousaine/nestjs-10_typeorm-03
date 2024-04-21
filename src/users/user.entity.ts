import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from './photo.entity';
import { OAuthUser } from '@jmondi/oauth2-server';
import { Token } from '../auth/entities/token.entity';
import * as bcrypt from 'bcrypt';

@Index('IDX_78a916df40e02a9deb1c4b75ed', ['username'], { unique: true })
@Entity()
export class User implements OAuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ unique: true, length: 60 })
  username: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Token, (token) => token.user)
  accessTokens: Token[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;

  async verify(password: string) {
    if (!(await bcrypt.compare(password, this.password))) {
      throw new Error('invalid password');
    }
  }
}
