// Packages
import { Module } from '@nestjs/common';

import { CloudinaryProvider } from './cloudinary';

// Services
import { FilesService } from './files.service';

// Controllers
import { FilesController } from './files.controller';

// Modules
import { CloudinaryModule } from 'nestjs-cloudinary';
import { CommonModule } from 'common/common.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [CloudinaryModule.forRootAsync(CloudinaryProvider), CommonModule],
})
export class FilesModule {}
