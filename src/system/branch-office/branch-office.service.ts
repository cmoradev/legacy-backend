import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BranchOffice } from './entities/branch-office.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Like } from 'typeorm';

@Injectable()
export class BranchOfficeService extends TypeOrmCrudService<BranchOffice> {
    constructor(
      @InjectRepository(BranchOffice, ColegioDBNameConnection) repo: Repository<BranchOffice>,
    ) {
        super(repo);
    }

    async findBranch(id: number) {
        return await this.repo.findOne({
            where: {
                id,
            },
        });
    }

    async findBranchWithSettings(id: number) {
        const paymentsQueryBuilder = await this.repo.createQueryBuilder('branchOffice')
          .leftJoinAndSelect('branchOffice.branchoffice', 'branchofficesetting', 'branchofficesetting.isActive=:status AND branchofficesetting.typeModule=:mod', {
              status: true,
              mod: 1,// modulo de tienda enum TypeModule
          }).where('branchOffice.id=:id', { id }).getOne();
        return paymentsQueryBuilder;
    }

    async getBranchLike(name: string, returnId?: boolean) {
        if (returnId) {
            const query = await this.repo.findOneOrFail({ name: Like(`%${name}%`) });
            return query.id;
        } else {
            return await this.repo.findOne({ name: Like(`%${name}%`) });
        }

    }
}
