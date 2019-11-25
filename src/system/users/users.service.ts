import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { StatusInvoce } from '../../invoice/interface/StatusInvoce.interface';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User, 'colegiodb') readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  public async create(createUserDto: Partial<User>): Promise<User> {
    let { password } = createUserDto;
    const { name, email, ...userOther } = createUserDto;
    password = await hash(password, 8);
    return this.repo.create({ name, email, password, ...userOther });
  }

  public async save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  public async forDepartament(id: User): Promise<number> {
    return this.repo.count({
      where: {
        department: {
          id,
        },
      },
    });
  }

}
