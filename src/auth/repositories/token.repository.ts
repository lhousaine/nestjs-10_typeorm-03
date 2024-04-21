import { DataSource, Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import {
  DateInterval,
  OAuthClient,
  OAuthTokenRepository,
  generateRandomToken,
} from '@jmondi/oauth2-server';
import { Client } from '../entities/client.entity';
import { AuthScope } from '../entities/scope.entity';
import { User } from '../../users/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository
  extends Repository<Token>
  implements OAuthTokenRepository
{
  constructor(private dataSource: DataSource) {
    super(Token, dataSource.createEntityManager());
  }

  findById(accessToken: string): Promise<Token> {
    return this.findOne({
      where: {
        accessToken,
      },
      relations: {
        user: true,
        client: true,
        scopes: true,
      },
    });
  }

  async issueToken(
    client: Client,
    scopes: AuthScope[],
    user?: User
  ): Promise<Token> {
    return Object.assign(new Token(), {
      accessToken: generateRandomToken(),
      accessTokenExpiresAt: new DateInterval('2h').getEndDate(),
      refreshToken: null,
      refreshTokenExpiresAt: null,
      client,
      clientId: client.id,
      user: user,
      userId: user?.id ?? null,
      scopes,
    });
  }

  async getByRefreshToken(refreshToken: string): Promise<Token> {
    return this.findOne({
      where: { refreshToken },
      relations: {
        client: true,
        scopes: true,
        user: true,
      },
    });
  }

  async isRefreshTokenRevoked(token: Token): Promise<boolean> {
    return Date.now() > (token.refreshTokenExpiresAt?.getTime() ?? 0);
  }

  async issueRefreshToken(token: Token, _: OAuthClient): Promise<Token> {
    token.refreshToken = generateRandomToken();
    token.refreshTokenExpiresAt = new DateInterval('2h').getEndDate();
    await this.update(
      {
        accessToken: token.accessToken,
      },
      {
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      }
    );
    return token;
  }

  async persist({ user, client, scopes, ...token }: Token): Promise<void> {
    await this.save(token);
  }

  async revoke(accessToken: Token): Promise<void> {
    accessToken.revoke();
    await this.updateToken(accessToken);
  }

  private async updateToken({
    user,
    client,
    scopes,
    ...token
  }: Token): Promise<void> {
    await this.update(
      {
        accessToken: token.accessToken,
      },
      token
    );
  }
}
