import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostSchema } from "./schemas/post.schema";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([PostSchema], "mongodb")],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
