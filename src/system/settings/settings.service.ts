import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class SettingsService extends TypeOrmCrudService<Company> {
    constructor(@InjectRepository(Company, ColegioDBNameConnection) companyRepository: Repository<Company>) {
        super(companyRepository);
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

    async fetchCompany(): Promise<Company> {
        const company = await this.findOne();
        if (company && company.uuid) {
            return company;
        }
        const createdCompany = this.repo.create();
        createdCompany.logo = '';
        return await this.repo.save(createdCompany);
    }
}
