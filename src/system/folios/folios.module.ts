import { Module } from '@nestjs/common';
import { FoliosController } from './folios.controller';
import { FoliosService } from './folios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folio } from './entities/folio.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([Folio], ColegioDBNameConnection)],
    providers: [FoliosService],
    exports: [FoliosService],
    controllers: [FoliosController],
})
export class FoliosModule {
}
