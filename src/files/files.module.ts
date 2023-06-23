import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryProvider } from './cloudinary';
import { CloudinaryModule } from 'nestjs-cloudinary';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [CloudinaryModule.forRootAsync(CloudinaryProvider)],
})
export class FilesModule {}
