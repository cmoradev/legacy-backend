import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { getRepository, Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Student } from './entities/student.entity';
import { TypeStudent } from './interface/studentsSchool.interface';
import { Inscription } from '../inscriptions/entities/inscription.entity';
import { capitalizarPrimeraLetra } from 'src/common/functions';

@Injectable()
export class StudentsService extends TypeOrmCrudService<Student> {
  constructor(
    @InjectRepository(Student, ColegioDBNameConnection)
    readonly repo: Repository<Student>,
    @InjectRepository(Inscription, ColegioDBNameConnection)
    readonly inscriptionRepo: Repository<Inscription>,
  ) {
    super(repo);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({ id }, { withDeleted: true });
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.restore(id);
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
    let propierties = this.repo.metadata.propertiesMap;
    let entityKeys: string[] = [];
    Object.keys(propierties).map((key) => {
      if (key !== fields[key]) {
        entityKeys.push(key);
      }
    });
    return entityKeys;
  }

  async relationships() {
    const relationships = this.repo.metadata.ownRelations.map(
      (relation) => relation.inverseEntityMetadata.targetName,
    );
    const relationsFields = this.repo.metadata.ownRelations.map(
      (relation) => relation.propertyName,
    );
    const relationsTrash = [
      'AcademiesModality',
      'Inscription',
      'Incident',
      'AcademyInscription',
      'MiniStoreSale',
      'SchoolCharge',
      'AcademyCharge',
    ];
    const filteredRelations = relationships.filter(
      (value) => !relationsTrash.includes(value),
    );
    let relationsResult = {};
    for (const relation of filteredRelations) {
      const repository = await getRepository(relation, ColegioDBNameConnection);
      let relationData = await repository.find({ select: ['id', 'name'] });
      relationData = JSON.parse(JSON.stringify(relationData));
      relationsResult[relation] = relationData;
    }
    return {
      relations: relationsResult,
    };
  }

  async bulkStudents(students: Student[]) {
    return await this.repo.save(students);
  }

  async findStudentByFullName(student: string) {
    return await this.repo
      .createQueryBuilder('student')
      .select([
        'student.id',
        'student.name',
        'student.lastNameFather, student.lastNameMother',
      ])
      .where(
        `CONCAT(student.nombre,' ',student.ap_paterno,' ',student.ap_materno) LIKE :fullName`,
        { fullName: student },
      )
      .getRawOne();
  }

  async getStudentsWithBranchOffice() {
    return await this.repo
      .createQueryBuilder('student')
      .innerJoinAndSelect('student.studentCampus', 'campus')
      .getMany();
  }

  public async getIEDUMetadata(studentId: number) {
    const student: Student = await this.repo.findOne(studentId);

    if (!student) {
      throw new NotFoundException('This entity does not exists');
    }

    const inscription: Inscription = await this.inscriptionRepo.findOne({
      where: { student: { id: studentId } },
      relations: ['inscripStudyPlan', 'inscripLevel'],
      order: { createdAt: 'DESC' },
    });

    if (!inscription) {
      throw new NotFoundException('Inscription for this student does not exists');
    }

    if (!inscription.inscripStudyPlan || !inscription.inscripLevel) {
      throw new NotFoundException('Study plan or level for this inscription does not exists');
    }

    return {
      version: '1.0',
      nombreAlumno: `${student.name} ${student.lastNameFather} ${student.lastNameMother}`,
      nivelEducativo: capitalizarPrimeraLetra(inscription.inscripLevel.name),
      CURP: `${student.curp}`.toUpperCase(),
      RVOE: inscription.inscripStudyPlan.code,
    };
  }
}
