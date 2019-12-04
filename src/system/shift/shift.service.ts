import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Route } from '../routes/entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftService extends TypeOrmCrudService<Shift> {
  constructor(
    @InjectRepository(Shift, 'colegiodb') readonly repo: Repository<Shift>,
  ) {
    super(repo);
  }
}
