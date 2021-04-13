import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { getRepository, Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Student } from './entities/student.entity';
import { TypeStudent } from './interface/studentsSchool.interface';

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

    async getNamesAtributesStudents(fields: Object) {
        let propierties = this.repo.metadata.propertiesMap
        let entityKeys: string[] = [];
        Object.keys(propierties).map((key) => {
            if (key !== fields[key]) {
                entityKeys.push(key);
            }
        })
        return entityKeys;
    }

    async relationships() {
        const relationships = this.repo.metadata.ownRelations.map(relation => relation.inverseEntityMetadata.targetName)
        const relationsFields = this.repo.metadata.ownRelations.map(relation => relation.propertyName);
        const relationsTrash = ['AcademiesModality', 'Inscription', 'Incident', 'AcademyInscription', 'MiniStoreSale', 'SchoolCharge', 'AcademyCharge'];
        const filteredRelations = relationships.filter(value => !relationsTrash.includes(value));
        let relationsResult = {};
        for (const relation of filteredRelations) {
            const repository = await getRepository(relation, ColegioDBNameConnection);
            let relationData = await repository.find({ select: ['id', 'name'] });
            relationData = JSON.parse(JSON.stringify(relationData));
            relationsResult[relation] = relationData;
        }
        return {
            relations: relationsResult
        }
    }
}
