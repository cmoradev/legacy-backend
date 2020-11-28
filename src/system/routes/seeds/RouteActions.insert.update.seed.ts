import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import routes from './route.catalogue';
import { Route } from '../entities/route.entity';
import routesActions from './RouteActions.catalogue';
import { RouteActionsAction } from '../entities/routeActionsAction.entity';

export default class RouteActionsInsertSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(RouteActionsAction)
            .values([...routesActions])
            .execute();
    }
}

