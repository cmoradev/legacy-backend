import { Module } from '@nestjs/common';
import { AcademicModule } from './academic/academic.module';

@Module({
  imports: [AcademicModule],
  exports: [AcademicModule],
})
export class IntegrationsModule {}
