import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../entities/role.entity';

export default class RolesInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list: Partial<Role>[] = [
            {
                'id': 1,
                'version': 0,
                'uuid': '',
                'isActive': true,
                'name': 'Administrador',
            },
            {
                'id': 2,
                'version': 0,
                'uuid': '',
                'isActive': true,
                'name': 'Gerente',
            },
            {
                'id': 3,
                'version': 0,
                'uuid': '',
                'isActive': true,
                'name': 'Reportes',
            },
            {
                'id': 4,
                'version': 0,
                'uuid': '',
                'isActive': true,
                'name': 'Administrador Caja',
            },
            {
                'id': 5,
                'version': 0,
                'uuid': '',
                'isActive': true,
                'name': 'Vendedor o Cajero',
            },

        ];
        await connection
          .createQueryBuilder()
          .insert()
          .into(Role)
          .values(list)
          .orUpdate({
              conflict_target: ['id'],
              overwrite: [
                  'id',
                  'name',
                  'uuid',
                  'version',
                  'isActive',
              ],
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}
