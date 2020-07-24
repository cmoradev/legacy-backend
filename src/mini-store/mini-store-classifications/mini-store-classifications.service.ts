import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Like } from "typeorm";

@Injectable()
export class MiniStoreClassificationsService extends TypeOrmCrudService<MiniStoreClassification> {
    constructor(
        @InjectRepository(MiniStoreClassification, ColegioDBNameConnection) readonly repo: Repository<MiniStoreClassification>,
    ) { super(repo); }

    async getClasificationLike(name:string, returnId?: boolean){
        if(returnId){
            const query = await this.repo.findOne({name: Like(`%${name}%`)});
            return query.id;
        } else {
            return await this.repo.findOne({name: Like(`%${name}%`)});
        }
    }
}
