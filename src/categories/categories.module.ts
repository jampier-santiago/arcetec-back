// Packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from 'common/common.module';
import { AuthModule } from 'auth/auth.module';

// Services
import { CategoriesService } from './categories.service';

// Controllers
import { CategoriesController } from './categories.controller';

// Entities
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    CommonModule,
  ],
})
export class CategoriesModule {}
