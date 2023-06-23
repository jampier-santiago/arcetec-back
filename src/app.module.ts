import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Config
import { envConfig } from './config/env.config';

import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    CategoriesModule,
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
  ],
})
export class AppModule {}
