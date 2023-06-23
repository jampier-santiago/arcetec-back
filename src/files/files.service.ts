// Packages
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CloudinaryResponse } from './cloudinary-response';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async create(file: Express.Multer.File): Promise<CloudinaryResponse> {
    // Check if the size of the file is more than 1M
    if (file.size > 1000000) {
      throw new BadRequestException(
        'Please upload a file size not more than 1M',
      );
    }
    // Check if the file is an image
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException(
        'Sorry, this file is not an image, please try again',
      );
    }

    try {
      const data = await this.cloudinaryService.uploadFile(file);
      return data.secure_url;
    } catch (error) {
      this.handleException(error);
    }
  }

  findOne(id: string) {
    return this.cloudinaryService.cloudinary.source(id);
  }

  private handleException(error: any) {
    throw new InternalServerErrorException(`Can't create category`);
  }
}
