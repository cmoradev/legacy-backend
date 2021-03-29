import { Cycle } from '../../cycles/entities/cycle.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';

export interface ListQuery {
    name: string;
    branchOffice: BranchOffice;
    cycle: Cycle;
    classroom: Classroomembers[]
}

export interface Classroomembers {
    name: string
    students: StudentsList[]
}

interface StudentsList {
    id: number;
    matricula: string;
    name: string;
}
