import { GrantIdentifier, OAuthClient } from '@jmondi/oauth2-server';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from './token.entity';
import { AuthScope } from './scope.entity';

@Entity()
export class Client implements OAuthClient {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  secret: string | null;

  @Column({ nullable: true })
  client: string | null;

  @Column('longtext')
  redirectUris: string[];

  @Column('longtext')
  allowedGrants: GrantIdentifier[];

  @OneToMany(() => AuthScope, (scope) => scope.client)
  scopes: AuthScope[];

  @OneToMany(() => Token, (token) => token.client)
  accessTokens: Token[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
