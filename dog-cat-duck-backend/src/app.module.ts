import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { STATIC_ROOT } from './config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', STATIC_ROOT),
      serveRoot: "/" + STATIC_ROOT,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
