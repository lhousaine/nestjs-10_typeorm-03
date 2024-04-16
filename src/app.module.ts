import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { MongodbDataSourceOptions, MysqlDataSourceOptions } from "./typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlDataSourceOptions),
    TypeOrmModule.forRoot(MongodbDataSourceOptions),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
