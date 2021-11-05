// Modules
import { Module } from '@nestjs/common';
// Providers
import { databaseProviders } from './database.provider';

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
