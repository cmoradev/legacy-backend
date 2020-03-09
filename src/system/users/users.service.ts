import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { StatusInvoce } from '../../invoice/interface/StatusInvoce.interface';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User, ColegioDBNameConnection) readonly repo: Repository<User>,
    ) {
        super(repo);
    }

    public async create(createUserDto: Partial<User>): Promise<User> {
        createUserDto.password = await hash(createUserDto.password, 8);
        return this.repo.create({ ...createUserDto });
    }

    public async changePassword(createUserDto: UpdatePasswordDto): Promise<User> {
        createUserDto.password = await hash(createUserDto.password, 8);
        return this.repo.create({ ...createUserDto });
    }

    public async save(user: User): Promise<User> {
        return this.repo.save(user);
    }

    public async getUserCasher(): Promise<User[]> {
        const cashiersAndSales = await this.repo.find({
            relations: ['salePayments', 'department'],
        });
        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.department !== null && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
        return cashiers;
    }

    public async forDepartament(id: number): Promise<number> {
        return this.repo.count({
            where: {
                department: {
                    id,
                },
            },
        });
    }

}
