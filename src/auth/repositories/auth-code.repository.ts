import {
  OAuthAuthCodeRepository,
  OAuthAuthCode,
  generateRandomToken,
  DateInterval,
} from '@jmondi/oauth2-server';
import { User } from '../../users/user.entity';
import { AuthCode } from '../entities/auth_code.entity';
import { Client } from '../entities/client.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthScope } from '../entities/scope.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthCodeRepository
  extends Repository<AuthCode>
  implements OAuthAuthCodeRepository
{
  constructor(private dataSource: DataSource) {
    super(AuthCode, dataSource.createEntityManager());
  }

  async getByIdentifier(authCodeCode: string): Promise<AuthCode> {
    return await this.findOne({
      where: {
        code: authCodeCode,
      },
      relations: {
        client: true,
      },
    });
  }

  async isRevoked(authCodeCode: string): Promise<boolean> {
    const authCode = await this.getByIdentifier(authCodeCode);
    return authCode.isExpired;
  }

  issueAuthCode(
    client: Client,
    user: User | undefined,
    scopes: AuthScope[]
  ): OAuthAuthCode {
    const authCode = new AuthCode();
    return Object.assign(authCode, {
      redirectUri: null,
      code: generateRandomToken(),
      codeChallenge: null,
      codeChallengeMethod: 'S256',
      expiresAt: new DateInterval('15m').getEndDate(),
      client,
      clientId: client.id,
      user,
      userId: user?.id ?? null,
      scopes,
    });
  }

  async persist({
    user,
    client,
    scopes,
    ...authCode
  }: AuthCode): Promise<void> {
    await this.save(authCode);
  }

  async revoke(authCodeCode: string): Promise<void> {
    await this.update(
      { code: authCodeCode },
      {
        expiresAt: new Date(0),
      }
    );
  }
}
