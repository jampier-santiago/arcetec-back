// Packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
})
export class CategoriesModule {}
