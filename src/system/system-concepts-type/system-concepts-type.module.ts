import { Module } from '@nestjs/common';
import { SystemConceptsTypeService } from './system-concepts-type.service';
import { SystemConceptsTypeController } from './system-concepts-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConceptsType } from './entities/system-concepts-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemConceptsType], 'colegiodb')],
  providers: [SystemConceptsTypeService],
  controllers: [SystemConceptsTypeController],
})
export class SystemConceptsTypeModule {
}
