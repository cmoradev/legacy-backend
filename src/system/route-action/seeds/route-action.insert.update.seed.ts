import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import routesActions from './route-action.catalogue';
import { RouteAction } from '../entities/route-action.entity';

export default class RouteActionInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(RouteAction)
            .values([...routesActions])
            .orUpdate({
                conflict_target: ['id'],
                overwrite: [
                    'id',
                    `routeId`,
                    `actionId`,
                ],
            })
            .orIgnore()// para ignorar valores duplicado
            .execute();
    }
}

