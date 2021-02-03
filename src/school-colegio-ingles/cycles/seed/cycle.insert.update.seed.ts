import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Cycle } from '../entities/cycle.entity';

export default class CycleInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const period: Cycle = {
            id: 1,
            name: 'Periodo 20201',
            dateStart: new Date(),
            dateEnd: new Date(),
            isActive: 1,
        } as Cycle;
        await connection.getRepository(Cycle).save(period);

    }
}
