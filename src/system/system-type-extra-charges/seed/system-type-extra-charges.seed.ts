import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { SystemTypeExtraCharges } from '../entities/system-type-extra-charges.entity';

export default class SystemTypeExtraChargesSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list: Partial<SystemTypeExtraCharges>[] = [
            {
                'id': 1,
                'version': 0,
                'uuid': '',
                'name': 'Descuentos',
                'operations': 'sum,subtraction,multiplication,division',
            },
            {
                'id': 2,
                'version': 0,
                'uuid': '',
                'name': 'Recargos',
                'operations': 'sum,subtraction,multiplication,division',
            },
            {
                'id': 3,
                'version': 0,
                'uuid': '',
                'name': 'Becas',
                'operations': 'sum,subtraction,multiplication,division',
            },
        ];
        await connection.getRepository(SystemTypeExtraCharges).save(list);
    }
}
