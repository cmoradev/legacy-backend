import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { TypeStudent } from './interface/studentsSchool.interface';
import { StudentInscriptionStatus } from '../../common/enums/PaymentStatus';

interface IResponseDashboardStudents {
    totalStudents: number,
    totalNewStudents: number,
    totalReEnrollment: number,
    totalReEntry: number,
    totalUnsubscribed: number
}

@Injectable()
export class StudentsService extends TypeOrmCrudService<Student> {
    constructor(
        @InjectRepository(Student, ColegioDBNameConnection) readonly repo: Repository<Student>,
    ) {
        super(repo);
    }

    generateMatricula(total: number, studentType: TypeStudent) {
        switch (studentType) {
            case TypeStudent.student:
                return 'PDC-' + (total + 1);
            case TypeStudent.externo:
                return 'PDCACE-' + (total + 1);
            case TypeStudent.prospecto:
        }
    }
}
