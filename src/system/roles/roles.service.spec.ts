import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { ColegioDBNameConnection, ColegioDBService } from '../../databases/colegiodb.service';
import { RouterModule } from 'nest-router';
import { routes } from '../../routes';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ TypeOrmModule.forRootAsync({
        imports: [Role],
        name: ColegioDBNameConnection,
        useClass: ColegioDBService,
      }),
        RouterModule.forRoutes(routes)],
      providers: [RolesService],
      controllers: [ RolesController],
      exports: [RolesService],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
