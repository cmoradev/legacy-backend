import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Identifier } from './entities/identifier.entity';
import { IdentifierController } from './identifier.controller';
import { IdentifierService } from './identifier.service.';

@Module({
  imports: [TypeOrmModule.forFeature([Identifier], ColegioDBNameConnection)],
  controllers: [IdentifierController],
  providers: [IdentifierService],
  exports: [IdentifierService],
})
export class IdentifierModule {}