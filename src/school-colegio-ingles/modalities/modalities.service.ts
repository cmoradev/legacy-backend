import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Modality } from './entities/modality.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class ModalitiesService extends TypeOrmCrudService<Modality> {
    constructor(@InjectRepository(Modality, ColegioDBNameConnection) repo: Repository<Modality>) {
        super(repo);
    }
}
