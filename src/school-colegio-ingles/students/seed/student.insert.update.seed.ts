import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Student } from '../entities/student.entity';
import { TypeStudent } from '../interface/studentsSchool.interface';
import { StudentInscriptionStatus } from '../../../common/enums/PaymentStatus';

export default class StudentInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list: Partial<any>[] = [
            {
                'id': 1,
                'matricula': '',
                'searchName': 'publico',
                'name': 'PUBLICO',
                'lastNameFather': 'EN',
                'lastNameMother': 'GENERAL',
                'statusStudent': StudentInscriptionStatus.activated
            },
        ];
        await connection.getRepository("alumnos").save(list);
    }
}
