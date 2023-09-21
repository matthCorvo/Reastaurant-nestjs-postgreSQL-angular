import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('RestaurantNeoxia')
    .setDescription('Restaurant NestJsApp Rest Api Docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT Token',
        in: 'header'
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
