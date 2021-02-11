import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { AcademiesModality } from '../entities/academy-modality.entity';

export default class AcademyModalitiesSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list: Partial<AcademiesModality>[] = [
            {
                'id': 1,
                'version': 0,
                'uuid': '',
                'name': 'Matutino',
            },
            {
                'id': 2,
                'version': 0,
                'uuid': '',
                'name': 'Vespertino',
            },
        ];
        await connection.getRepository(AcademiesModality).save(list);
    }
}
