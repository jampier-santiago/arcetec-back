// Packages
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string) {
    // check if the id has the characteristics of a mongo id
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Is not a valid id');
    }

    return value;
  }
}
