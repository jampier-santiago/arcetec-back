// Packages
import { Module } from '@nestjs/common';

// Services
import { HandleErrorsService } from './services/handle-errors/handle-errors.service';

@Module({
  providers: [HandleErrorsService],
  exports: [HandleErrorsService],
})
export class CommonModule {}
