import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existedUser = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });
    if (existedUser) {
      throw new BadRequestException(
        'user with this identification already exist'
      );
    }
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.username = createUserDto.username;

    const saltOrRounds = 10;
    user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.salt = await bcrypt.genSalt();
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  getFilteredUserWithTheirPhotos(search: string): Promise<User[]> {
    return this.usersRepository.getUsersWithPhotos(search);
  }
}
