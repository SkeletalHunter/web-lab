import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
// import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = app.get(ConfigService).get<number>('PORT') || 3000;

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const hbs = require('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  hbs.registerHelper('repeate', function (n, block) {
    let res = '';
    for (let i = 1; i <= n; i++) res += block.fn(i);
    return res;
  });

  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Mihail Plavko: My API for Users and Events')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {include: [UserModule, EventModule]});
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Listening on ${PORT} \n http://localhost:${PORT}`));
}
bootstrap();