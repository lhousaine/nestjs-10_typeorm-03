import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { MysqlDataSourceOptions } from '../typeorm.config';
import { Client } from './entities/client.entity';
import { Token } from './entities/token.entity';
import { AuthScope } from './entities/scope.entity';
import { AuthCode } from './entities/auth_code.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature(
      [Client, Token, AuthScope, AuthCode],
      MysqlDataSourceOptions
    ),
    JwtModule.register({
      global: true,
      secret: process.env.API_JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
