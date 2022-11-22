import {Injectable, NotFoundException} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BranchOffice } from './entities/branch-office.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Like } from 'typeorm';

@Injectable()
export class BranchOfficeService extends TypeOrmCrudService<BranchOffice> {
    constructor(
      @InjectRepository(BranchOffice, ColegioDBNameConnection) repo: Repository<BranchOffice>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.restore(id);
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
