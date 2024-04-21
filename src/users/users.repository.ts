import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { GrantIdentifier, OAuthUserRepository } from '@jmondi/oauth2-server';
import { Client } from '../auth/entities/client.entity';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements OAuthUserRepository
{
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserByCredentials(
    identifier: string,
    password?: string,
    _grantType?: GrantIdentifier,
    _client?: Client
  ): Promise<User> {
    const user = await this.findOne({
      where: { username: identifier },
    });

    if (password) await user.verify(password);

    return user;
  }

  getUsersWithPhotos(search: string) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo')
      .where(
        `user.firstName like "%${search}%" OR user.lastName like "%${search}%"`
      )
      .getMany();
  }
}
