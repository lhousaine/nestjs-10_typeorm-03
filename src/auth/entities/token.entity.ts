import { OAuthToken } from '@jmondi/oauth2-server';
import { Client } from './client.entity';
import { User } from '../../users/user.entity';
import { AuthScope } from './scope.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
  Entity,
} from 'typeorm';

@Entity()
export class Token implements OAuthToken {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  accessToken: string;

  @Column()
  accessTokenExpiresAt: Date;

  @Column({ nullable: true })
  refreshToken: string | null;

  @Column({ nullable: true })
  refreshTokenExpiresAt: Date | null;

  @ManyToOne(() => Client, (client) => client.accessTokens)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'client_id', nullable: true })
  clientId: string;

  @ManyToOne(() => User, (user) => user.accessTokens)
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({ nullable: true, name: 'user_id' })
  userId: string | null;

  @ManyToMany(() => AuthScope)
  @JoinTable({
    name: 'access_token_scopes',
    joinColumn: {
      name: 'token_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'scope_id',
      referencedColumnName: 'id',
    },
  })
  scopes: AuthScope[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  revoke() {
    this.accessTokenExpiresAt = new Date(0);
    this.refreshTokenExpiresAt = new Date(0);
  }
}
