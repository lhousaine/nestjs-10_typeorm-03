import { Injectable } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoRepository } from './photos.repository';

@Injectable()
export class PhotosService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async findOne(id: number): Promise<Photo> {
    return await this.photoRepository.findOneBy({ id });
  }

  async create(photo: Photo): Promise<Photo> {
    const newPhoto = this.photoRepository.create(photo);
    return await this.photoRepository.save(newPhoto);
  }

  async update(id: number, photo: Photo): Promise<Photo> {
    await this.photoRepository.update(id, photo);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }
}
