// Packages
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class HandleErrorsService {
  handleException(error: any, messageError: string): never {
    // Review the nest code, for errors of repeated elements
    if (error.code === 11000) {
      throw new BadRequestException(`Element exist in db`);
    }

    throw new InternalServerErrorException(messageError);
  }
}
