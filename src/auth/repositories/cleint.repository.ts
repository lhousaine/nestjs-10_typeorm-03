import {
  GrantIdentifier,
  OAuthClient,
  OAuthClientRepository,
} from '@jmondi/oauth2-server';
import { Client } from '../entities/client.entity';
import { Repository } from 'typeorm';
import { MysqlDataSource } from '../../typeorm.config';

export class ClientRepository
  extends Repository<Client>
  implements OAuthClientRepository
{
  constructor() {
    super(Client, MysqlDataSource.createEntityManager());
  }

  async getByIdentifier(clientId: string): Promise<Client> {
    return await this.findOne({
      where: {
        client: clientId,
      },
      relations: {
        scopes: true,
      },
    });
  }

  async isClientValid(
    grantType: GrantIdentifier,
    client: OAuthClient,
    clientSecret?: string
  ): Promise<boolean> {
    if (client.secret && client.secret !== clientSecret) {
      return false;
    }
    return client.allowedGrants.includes(grantType);
  }
}
