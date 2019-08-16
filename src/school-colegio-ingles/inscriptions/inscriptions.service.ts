import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Inscription } from './entities/inscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { VerificarInscriprions } from './interfaces/inscriptions.interface';
import { VerifyregistratioDto } from './dto/verifyregistratio.dto';

@Injectable()
export class InscriptionsService extends TypeOrmCrudService<Inscription> {
    constructor(
        @InjectRepository(Inscription, 'colegiodb') readonly repo: Repository<Inscription>,
        @InjectRepository(Student, 'colegiodb') readonly student: Repository<Student>,
    ) {
        super(repo);
    }

    async verificarInscription(data: VerificarInscriprions, datainsc: VerifyregistratioDto): Promise<any> {
        const result: any = {
            registered: [],
            notregistered: [],
            nonstudent: [],
        };
        for (const student of data.data) {

            const studentR: any = await this.student.findOne({ matricula: student.matricula });
            if (studentR) {
                const inscripcionalumno = await this.repo.findOne({
                        student: {
                            id: studentR.id,
                        },
                        campus: {
                            id: datainsc.plantel,
                        },
                        level: {
                            id: datainsc.nivel,
                        },
                        grade: {
                            id: datainsc.grado,
                        },
                        group: {
                            id: datainsc.grupo,
                        },
                        cycle: {
                            id: datainsc.ciclo,
                        },
                    },
                );

                if (inscripcionalumno) {
                    studentR.inscripcion = inscripcionalumno;
                    // inscritor y registrado en el grupo grado nivel
                    result.registered.push(studentR);
                } else {
                    // regitrado pero no inscrito en la seecion selecionada
                    result.notregistered.push(studentR);
                }
            } else {
                // no regitrado en el sistema
                result.nonstudent.push(student);
            }

        }
        return result;
    }
}
