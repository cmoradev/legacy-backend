import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import permissionDev from './permission.dev.catalogue';

export default class PermissionsDevInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
          .createQueryBuilder()
          .insert()
          .into(Permission)
          .values([...permissionDev])
          .orUpdate({
              conflict_target: ['id'],
              overwrite: [],
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}

