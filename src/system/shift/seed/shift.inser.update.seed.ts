import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Shift } from '../entities/shift.entity';

export default class ShiftInserUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
          .createQueryBuilder()
          .insert()
          .into(Shift)
          .values([
              {
                  id: 1,
                  name: 'Matutino',
                  version:1,
                  uuid: ''
              },
              {
                  id: 2,
                  name: 'Vespertino',
                  version:1,
                  uuid: ''
              },
              {
                  id: 3,
                  name: 'Sabatino',
                  version:1,
                  uuid: ''
              },
          ])
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}
