import { Module } from '@nestjs/common';
import { ResponsiveLettersService } from './responsive-letters.service';
import { ResponsiveLettersController } from './responsive-letters.controller';

@Module({
  providers: [ResponsiveLettersService],
  controllers: [ResponsiveLettersController]
})
export class ResponsiveLettersModule {}
