import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
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

    public async get_user_with_store_sales(): Promise<User[]> {
        // consulta para obtener solo los usuarios con ventas en tienda
        const cashiersAndSales = await this.repo.createQueryBuilder('user')
          .innerJoin('user.salePayments', 'salePayments')
          .leftJoinAndSelect('user.role', 'role')
          .select([
              'user.id',
              'user.name',
              'role.id',
              'role.name',
          ])
          .getMany();
        return cashiersAndSales;
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
