import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Action } from '../../school-colegio-ingles/actions/entities/action.entity';

export default class CreateA implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Action)
            .values([
                { name: 'CREATE' },
                { name: 'READ' },
                { name: 'UPDATE' },
                { name: 'DELETE' },
            ])
            .execute();
    }
}

