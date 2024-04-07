import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Photo> {
    return this.photosService.findOne(id);
  }

  @Post()
  create(@Body() photo: Photo): Promise<Photo> {
    return this.photosService.create(photo);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() photo: Photo): Promise<Photo> {
    return this.photosService.update(id, photo);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.photosService.delete(id);
  }
}
