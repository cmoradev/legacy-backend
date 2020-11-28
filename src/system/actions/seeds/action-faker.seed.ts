import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Action } from '../entities/action.entity';

export default class CreateFakerActions implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        // await factory(Action)().createMany(10);
    }
}
