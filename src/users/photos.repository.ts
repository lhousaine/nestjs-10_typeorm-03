import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoRepository extends Repository<Photo> {
  constructor(private dataSource: DataSource) {
    super(Photo, dataSource.createEntityManager());
  }
}
