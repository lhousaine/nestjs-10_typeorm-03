import { Injectable } from "@nestjs/common";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostSchema } from "./schemas/post.schema";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostSchema, "mongodb")
    private postRepository: MongoRepository<PostSchema>
  ) {}

  async create(post: PostSchema): Promise<PostSchema> {
    return this.postRepository.save(post);
  }

  async findAll(): Promise<PostSchema[]> {
    return this.postRepository.find();
  }

  findOne(id: string) {
    return this.postRepository.findOneBy({ _id: new ObjectId(id) });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: updatePostDto },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
  }

  remove(id: string) {
    return this.postRepository.delete(id);
  }

  async findPostsStats() {
    return this.postRepository
      .aggregate([
        {
          $match: { isPublished: true },
        },
        {
          $group: {
            _id: null,
            posts: { $sum: 1 },
          },
        },
      ])
      .project({
        _id: 0,
        posts: 1,
      }).toArray();
  }
}
