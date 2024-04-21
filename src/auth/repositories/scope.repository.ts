import { AuthScope } from './../entities/scope.entity';
import { DataSource, In, Repository } from 'typeorm';
import {
  GrantIdentifier,
  OAuthScope,
  OAuthScopeRepository,
} from '@jmondi/oauth2-server';
import { Client } from '../entities/client.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScopeRepository
  extends Repository<AuthScope>
  implements OAuthScopeRepository
{
  constructor(private dataSource: DataSource) {
    super(AuthScope, dataSource.createEntityManager());
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
