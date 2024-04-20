import { OAuthScope } from '@jmondi/oauth2-server';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class AuthScope implements OAuthScope {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @ManyToOne(() => Client, (client) => client.scopes)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
