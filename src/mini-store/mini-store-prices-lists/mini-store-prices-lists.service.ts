import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStorePriceList } from './entities/mini-store-price-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Like } from "typeorm";

@Injectable()
export class MiniStorePricesListsService extends TypeOrmCrudService<MiniStorePriceList> {
    constructor(
        @InjectRepository(MiniStorePriceList, ColegioDBNameConnection)readonly repo: Repository<MiniStorePriceList>,
    ) { super(repo); }

    public async getListLike(name:string, returnId?: boolean){
        if(returnId){
            const query = await this.repo.findOne({name: Like(`%${name}%`)});
            return query.id;
        } else {
            return await this.repo.findOne({name: Like(`%${name}%`)});
        }
    }
}
