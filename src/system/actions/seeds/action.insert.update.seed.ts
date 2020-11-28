import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Action } from '../entities/action.entity';
import actions from './actions.catalogue';

export default class ActionInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Action)
            .values([...actions])
            .orUpdate({ conflict_target: ['id'], overwrite: ['name', 'description', 'icon', 'isDefault'] })
            .orIgnore()// para ignorar valores duplicado
            .execute();
    }
}

