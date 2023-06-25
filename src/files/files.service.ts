// Packages
import { BadRequestException, Injectable } from '@nestjs/common';

import { CloudinaryResponse } from './cloudinary-response';

// Services
import { CloudinaryService } from 'nestjs-cloudinary';
import { HandleErrorsService } from 'common/services/handle-errors/handle-errors.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly handleErrorsService: HandleErrorsService,
  ) {}

  async create(
    file: Express.Multer.File,
  ): Promise<{ url: CloudinaryResponse }> {
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

    // Try to upload the image to cloudinary
    try {
      const data = await this.cloudinaryService.uploadFile(file);
      return { url: data.secure_url };
    } catch (error) {
      this.handleErrorsService.handleException(error, `The image can't upload`);
    }
  }

  // Get the image by id
  findOne(id: string) {
    return this.cloudinaryService.cloudinary.source(id);
  }
}
