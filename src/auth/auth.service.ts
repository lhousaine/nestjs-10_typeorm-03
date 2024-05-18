import {
  AuthorizationServer,
  DateInterval,
  JwtService as AuthJwtService,
} from '@jmondi/oauth2-server';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthCodeRepository } from './repositories/auth-code.repository';
import { ClientRepository } from './repositories/client.repository';
import { TokenRepository } from './repositories/token.repository';
import { ScopeRepository } from './repositories/scope.repository';
import { UserRepository } from '../users/users.repository';

import {
  handleExpressError,
  handleExpressResponse,
  requestFromExpress,
} from '@jmondi/oauth2-server/express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly jwt: AuthJwtService;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
    private readonly scopeRepository: ScopeRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly authCodeRepository: AuthCodeRepository,
    private jwtService: JwtService
  ) {
    this.jwt = new AuthJwtService('JWT_SECRET');
  }

  getAuthService() {
    const authorizationServer = new AuthorizationServer(
      this.clientRepository,
      this.tokenRepository,
      this.scopeRepository,
      this.jwt,
      {}
    );

    authorizationServer.enableGrantTypes(
      [
        {
          grant: 'authorization_code',
          authCodeRepository: this.authCodeRepository,
          userRepository: this.userRepository,
        },
        new DateInterval('15m'),
      ],
      ['client_credentials', new DateInterval('1d')]
    );
    // Supported grant_type
    authorizationServer.enableGrantType('client_credentials');
    authorizationServer.enableGrantType({
      grant: 'authorization_code',
      authCodeRepository: this.authCodeRepository,
      userRepository: this.userRepository,
    });
    authorizationServer.enableGrantType('refresh_token');
    authorizationServer.enableGrantType('implicit');
    authorizationServer.enableGrantType({
      grant: 'password',
      userRepository: this.userRepository,
    });
    return authorizationServer;
  }

  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({ username });
    if (!bcrypt.compare(pass, user?.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async generateToken(req: Request, res: Response) {
    try {
      const oauthResponse =
        await this.getAuthService().respondToAccessTokenRequest(req);
      return handleExpressResponse(res, oauthResponse);
    } catch (e) {
      handleExpressError(e, res);
      return;
    }
  }

  async authorize(req: Request, res: Response) {
    const authorizationServer = this.getAuthService();
    try {
      const authRequest =
        await authorizationServer.validateAuthorizationRequest(
          requestFromExpress(req)
        );

      authRequest.user = { id: 'abc', email: 'user@example.com' };
      authRequest.isAuthorizationApproved = true;

      const oauthResponse =
        await authorizationServer.completeAuthorizationRequest(authRequest);
      return handleExpressResponse(res, oauthResponse);
    } catch (e) {
      handleExpressError(e, res);
    }
  }

  async revokeToken(req: Request, res: Response) {
    try {
      const oauthResponse = await this.getAuthService().revoke(req);
      return handleExpressResponse(res, oauthResponse);
    } catch (e) {
      handleExpressError(e, res);
      return;
    }
  }
}
