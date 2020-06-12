import { AcademyActivitiesGroup } from '../../academy-activities-group/entities/academy-activities-group.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';

export interface QueryMensualidades {
    activityId: number | string;
    ActivityGroupId: number | string;
    month: string | Date;
    cycleId: number | string;
    branchOfficeId: number | string;
    file?: boolean;
}

export interface QueryFile {
    src: string;
    type: string;
    name: string;
}

export interface QueryResultMoths {
    id: number;
    name: string;
    academyActivityGroups: ActivityGroup[];
}

interface ActivityGroup {
    id: number;
    name: string;
    schedule: string;
    academyGroupCampus: AcademyActivitiesGroup;
    academyGroupCycle: Cycle;
    students: ActivityGroupStudents[];
}

interface ActivityGroupStudents {
    id: number;
    matricula: string;
    name: string;
    type: string;
    level: string;
    grade: string;
    group: string;
    state: number | string;
    date: string;
}
