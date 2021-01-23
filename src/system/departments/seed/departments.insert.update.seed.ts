import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Department } from '../entities/department.entity';

export default class DepartmentsInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list: Partial<Department>[] = [
            {
                'id': 1,
                'version': 0,
                'uuid': '',
                'name': 'Dirección General',
                'description': null,
            },
            {
                'id': 2,
                'version': 0,
                'uuid': '',
                'name': 'Sistemas',
                'description': null,
            },
            {
                'id': 3,
                'version': 0,
                'uuid': '',
                'name': 'Ventas o Caja',
                'description': null,
            },
            {
                'id': 4,
                'version': 0,
                'uuid': '',
                'name': 'Compras',
                'description': null,
            },
            {
                'id': 5,
                'version': 0,
                'uuid': '',
                'name': 'Almacén',
                'description': null,
            },
            {
                'id': 6,
                'version': 0,
                'uuid': '',
                'name': 'Logística',
                'description': null,
            },
            {
                'id': 7,
                'version': 0,
                'uuid': '',
                'name': 'Marketing',
                'description': null,
            },
            {
                'id': 8,
                'version': 0,
                'uuid': '',
                'name': 'Administración y Contabilidad.',
                'description': null,
            },
            {
                'id': 9,
                'version': 0,
                'uuid': '',
                'name': 'Recursos humanos – RRHH',
                'description': null,
            },

        ];
        await connection
          .createQueryBuilder()
          .insert()
          .into(Department)
          .values(list)
          .orUpdate({
              conflict_target: ['id'],
              overwrite: [
                  'id',
                  'name',
                  'uuid',
                  'version',
                  'description',
              ],
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}
