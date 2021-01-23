import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import permission from './permission.catalogue';

export default class PermissionsInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
          .createQueryBuilder()
          .insert()
          .into(Permission)
          .values([...permission])
          .orUpdate({
              conflict_target: ['id'],
              overwrite: [
                  'id',
                  'isActive',
                  'name',
                  'fatherID',
                  'level',
                  'url',
                  'icon',
                  'mpath',
              ],
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}

