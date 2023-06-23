// Packages
import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Services
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.create(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }
}
