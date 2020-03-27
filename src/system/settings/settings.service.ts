import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class SettingsService extends TypeOrmCrudService<Company> {
    constructor(@InjectRepository(Company, ColegioDBNameConnection) companyRepository: Repository<Company>) {
        super(companyRepository);
    }

    async fetchCompany(): Promise<Company> {
        const company = await this.findOne();
        if (company && company.uuid) {
            return company;
        }
        const createdCompany = this.repo.create();
        createdCompany.logo = '';
        return this.repo.save(createdCompany);
    }
}
