import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceKeys } from './entities/invoice-keys.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Like } from 'typeorm';

@Injectable()
export class InvoiceKeysService extends TypeOrmCrudService<InvoiceKeys> {
    constructor(
        @InjectRepository(InvoiceKeys, ColegioDBNameConnection) repo: Repository<InvoiceKeys>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }

    async getInvoiceKeyLike(name: string, returnId?: boolean) {
        if (returnId) {
            const query = await this.repo.findOneOrFail({ name: Like(`%${name}%`) });
            return query?.id;
        } else {
            return await this.repo.findOne({ name: Like(`%${name}%`) });
        }

    }
}
