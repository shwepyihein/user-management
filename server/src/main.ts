import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.setGlobalPrefix('/');
  const swaggerOption = new DocumentBuilder()
    .setTitle(' API Documentation')
    .setDescription(' API Documention')
    .setVersion('1.0.0')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup('/docs', app, swaggerDoc);
  await app.listen(8000);
}
bootstrap();
