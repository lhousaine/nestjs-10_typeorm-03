import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { Client } from './entities/client.entity';
import { Token } from './entities/token.entity';
import { AuthScope } from './entities/scope.entity';
import { AuthCode } from './entities/auth_code.entity';
import { User } from '../users/user.entity';
import { AuthCodeRepository } from './repositories/auth-code.repository';
import { ClientRepository } from './repositories/client.repository';
import { ScopeRepository } from './repositories/scope.repository';
import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Client, Token, AuthScope, AuthCode]),
    JwtModule.register({
      global: true,
      secret: process.env.API_JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ClientRepository,
    ScopeRepository,
    TokenRepository,
    AuthCodeRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
