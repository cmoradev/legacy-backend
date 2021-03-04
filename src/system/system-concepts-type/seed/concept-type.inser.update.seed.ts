import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { SystemConceptsType } from '../entities/system-concepts-type.entity';

export default class ConceptTypeInserUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
          .createQueryBuilder()
          .insert()
          .into(SystemConceptsType)
          .values([
              {
                  id: 1,
                  name: 'Inscripción',
                  version: 1,
                  uuid: '',
              },
              {
                  id: 2,
                  name: 'Mensualidad',
                  version: 1,
                  uuid: '',
              },
              {
                  id: 3,
                  name: 'Día',
                  version: 1,
                  uuid: '',
              },
              {
                  id: 4,
                  name: 'Hora',
                  version: 1,
                  uuid: '',
              },
              {
                  id: 5,
                  name: 'Penalización',
                  version: 1,
                  uuid: '',
              },

          ])
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}
