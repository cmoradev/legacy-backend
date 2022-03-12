import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './system/auth/auth.module';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as boolParser from 'express-query-boolean';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.enableCors({ origin: '*' });
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
  app.use(boolParser());
  app.use(bodyParser.json({ limit: '50mb' }));
  const environment = process.env.NODE_ENV || 'development';
  const processEnv: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
  const options = new DocumentBuilder()
    .setTitle('Apps')
    .setDescription('Es la aplicación de escuela')
    .setVersion('1.0')
    .addTag('School')
    .build();
  app.get(AuthModule).initialize(app);
  const document = SwaggerModule.createDocument(app, options);
  environment === 'development'
    ? SwaggerModule.setup('api', app, document)
    : null;
  await app.listen(processEnv.API_PORT);
  logger.log(`Application is running in ${environment.toUpperCase()} on: ${await app.getUrl()}`);

}

bootstrap();
