import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemApplicationForms } from './entities/system-application-forms.entity';

@Injectable()
export class SystemApplicationFormsService  extends TypeOrmCrudService<SystemApplicationForms> {
  constructor(
    @InjectRepository(SystemApplicationForms, 'colegiodb') readonly repo: Repository<SystemApplicationForms>,
  ) {
    super(repo);
  }

}
