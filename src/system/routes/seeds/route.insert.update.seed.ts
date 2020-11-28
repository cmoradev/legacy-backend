import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import routes from './route.catalogue';
import { Route } from '../entities/route.entity';

export default class RouteInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Route)
            .values([...routes])
            .orUpdate({
                conflict_target: ['id'], overwrite: [
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

