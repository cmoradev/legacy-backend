import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './system/auth/auth.module';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as boolParser from 'express-query-boolean';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
    app.use(boolParser());
    const environment = process.env.NODE_ENV || 'development';
    const processEnv: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
    const options = new DocumentBuilder()
        .setTitle('Apps')
        .setDescription('Es la aplicación de escuela')
        .setVersion('1.0')
        .addTag('School')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    app.get(AuthModule).initialize(app);
    await app.listen(processEnv.API_PORT);
    console.log(`App Ready on ${processEnv.API_PORT}`);
}

bootstrap();
