import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from '../../levels/entities/level.entity';
import { Student } from '../../students/entities/student.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Family } from '../../families/entities/family.entity';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { SystemExtraCharges } from '../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { SchoolCharge } from '../../charges/school-charges/entities/school-charge.entity';

@Entity('planteles')
export class Campus {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'plantel',
  })
  name: string;

  @Column('int', {
    nullable: false,
    name: 'id_ubicacion',
  })
  idLocation: number;

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

  @OneToMany(() => Level, (level) => level.campus)
  levels: Level[];

  @OneToMany(() => Student, (student) => student.studentCampus)
  students: Student[];

  @OneToMany(() => Inscription, (inscription) => inscription.inscripCampus)
  campusInscriptions: Inscription[];

  @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsCampus)
  campusAcademyConcepts: AcademyConcepts[];

  @OneToMany(() => AcademyActivitiesGroup, (academygroup) => academygroup.academyGroupCampus)
  campusAcademyGroups: AcademyActivitiesGroup[];

  @OneToMany(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargesCampus)
  campusExtraCharges: SystemExtraCharges[];

  @OneToMany(() => Family, (family) => family.campus)
  families: Family[];

  @OneToMany(() => User, (user) => user.campus)
  users: User[];

  @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.acInsCampus)
  campusAcIns: AcademyInscription[];

  @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.schoolCampus)
  campusSchoolCharge: SchoolCharge[];
}
