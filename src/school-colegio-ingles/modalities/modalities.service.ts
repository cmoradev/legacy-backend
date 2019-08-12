import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Modality } from './entities/modality.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModalitiesService extends TypeOrmCrudService<Modality> {
    constructor(@InjectRepository(Modality, 'colegiodb') repo: Repository<Modality>) {
        super(repo);
    }
}
