import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from '../../levels/entities/level.entity';
import { Group } from '../../groups/entities/group.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';

@Entity('grados')
export class Grade {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'id_nivel',
    })
    idLevel: number;

    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'grado',
    })
    name: string | null;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @ManyToOne(() => Level, (level) => level.grades)
    level: Level;

    @Column('int', {
        nullable: true,
        name: 'levelId',
    })
    levelId: number | string | null;

    @ManyToMany(type => PaymentPlan, paymentPlan => paymentPlan.grades)
    paymentPlans: PaymentPlan[];

    @OneToMany(() => Group, (group) => group.groupGrade)
    groups: Group[];

    @OneToMany(() => Classroom, (classroom) => classroom.grade)
    classrooms: Classroom[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripGrade)
    gradeInscriptions: Inscription[];
    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.grade)
    assignmentsSubjects: AssignmentSubject[];
}
