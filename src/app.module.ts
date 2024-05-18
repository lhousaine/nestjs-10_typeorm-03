import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import {
  MongodbDataSourceOptions,
  MysqlDataSourceOptions,
} from './typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...MysqlDataSourceOptions,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forRoot(MongodbDataSourceOptions),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}
