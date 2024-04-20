import { CodeChallengeMethod, OAuthAuthCode } from '@jmondi/oauth2-server';
import { User } from '../../users/user.entity';
import { Client } from './client.entity';
import { AuthScope } from './scope.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class AuthCode implements OAuthAuthCode {
  @PrimaryGeneratedColumn('uuid')
  readonly code: string;

  @Column({ nullable: true })
  codeChallenge: string | null;

  @Column({ nullable: true })
  codeChallengeMethod: CodeChallengeMethod;

  @Column({ nullable: true })
  redirectUri: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({ name: 'user_id', nullable: true })
  userId: string | null;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'client_id', nullable: true })
  clientId: string;

  @ManyToMany(() => AuthScope)
  @JoinTable({
    name: 'auth_code_scopes',
    joinColumn: {
      name: 'code',
      referencedColumnName: 'code',
    },
    inverseJoinColumn: {
      name: 'scope_id',
      referencedColumnName: 'id',
    },
  })
  scopes: AuthScope[];

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
