import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Photo } from './photo.entity';
import { PhotoController } from './photos.controller';
import { PhotosService } from './photos.service';
import { UserRepository } from './users.repository';
import { PhotoRepository } from './photos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo])],
  providers: [UsersService, PhotosService, UserRepository, PhotoRepository],
  controllers: [UsersController, PhotoController],
})
export class UsersModule {}
