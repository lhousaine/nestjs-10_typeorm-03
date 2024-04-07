import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  getUsersWithPhotos(search: string) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo')
      .where(
        `user.firstName like "%${search}%" OR user.lastName like "%${search}%"`,
      )
      .getOne();
  }
}
