import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BranchOffice } from './entities/branch-office.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Like } from "typeorm";

@Injectable()
export class BranchOfficeService extends TypeOrmCrudService<BranchOffice> {
    constructor(
        @InjectRepository(BranchOffice, ColegioDBNameConnection) repo: Repository<BranchOffice>,
    ) { super(repo); }

    async findBranch(id: number) {
        return await this.repo.findOne({
            where: {
                id,
            },
        });
    }

    async getBranchLike(name:string, returnId?: boolean){
        if(returnId){
            const query = await this.repo.findOneOrFail({name:Like(`%${name}%`)});
            return query.id;
        } else {
            return await this.repo.findOne({name:Like(`%${name}%`)});
        }

    }
}
