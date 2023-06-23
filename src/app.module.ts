import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Config
import { envConfig } from './config/env.config';

import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    CategoriesModule,
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    FilesModule,
  ],
})
export class AppModule {}
