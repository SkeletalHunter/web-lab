import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from "./user/user.module";
import { EventModule } from './event/event.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, EventModule],
  controllers: [AppController]
})
export class AppModule {}
