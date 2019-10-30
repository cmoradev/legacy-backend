import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './school-colegio-ingles/auth/auth.module';
import * as path from 'path';
import * as favicon from 'serve-favicon';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(favicon(path.join(__dirname, '..' , 'public', 'favicon.ico')));

  const options = new DocumentBuilder()
      .setTitle('Apps')
      .setDescription('Es la aplicación de escuela')
      .setVersion('1.0')
      .addTag('School')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.get(AuthModule).initialize(app);

  await app.listen(3000);
}
bootstrap();
