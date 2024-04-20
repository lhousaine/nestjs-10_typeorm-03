import { MysqlDataSource } from 'src/typeorm.config';
import { AuthScope } from './../entities/scope.entity';
import { In, Repository } from 'typeorm';
import {
  GrantIdentifier,
  OAuthScope,
  OAuthScopeRepository,
} from '@jmondi/oauth2-server';
import { Client } from '../entities/client.entity';

export class ScopeRepository
  extends Repository<AuthScope>
  implements OAuthScopeRepository
{
  constructor() {
    super(AuthScope, MysqlDataSource.createEntityManager());
  }

  async getAllByIdentifiers(scopeNames: string[]): Promise<AuthScope[]> {
    return this.find({
      where: {
        name: In(scopeNames),
      },
    });
  }

  async finalize(
    scopes: OAuthScope[],
    _identifier: GrantIdentifier,
    _client: Client,
    _user_id?: string
  ): Promise<OAuthScope[]> {
    return scopes;
  }
}
