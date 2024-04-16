import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostSchema } from "./schemas/post.schema";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongodbDataSourceOptions } from "../typeorm.config";

@Module({
  imports: [TypeOrmModule.forFeature([PostSchema], MongodbDataSourceOptions)],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
