import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { User } from '../entities/user.entity';
import { UsersCatalogue } from './users.catalogue';
import { hash } from 'bcrypt';

export default class UsersInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list = await Promise.all(UsersCatalogue.map(async (user): Promise<User> => {
            user.password = await hash(user.password, 8);
            return user;
        }));
        await connection
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(list)
          .orUpdate({
              conflict_target: ['id'],
              overwrite: [
                  'id',
                  'name',
                  'lastnameMother',
                  'lastnameFather',
                  'version',
                  'uuid',
                  'email',
                  'password',
                  'img',
                  'isActive',
                  'campus',
                  'department',
                  'role',
              ],
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}

