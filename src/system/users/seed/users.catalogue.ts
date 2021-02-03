import { User } from '../entities/user.entity';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { Department } from '../../departments/entities/department.entity';
import { Role } from '../../roles/entities/role.entity';

export const UsersCatalogue: User[] = [
    {
        id: 1,
        name: 'Admin',
        lastnameMother: '',
        lastnameFather: '',
        version: 1,
        uuid: 'dd828b00-5da1-11eb-ae93-0242ac130002',
        email: 'admin@gmail.com',
        password: 'muunyal',
        campus: {
            id: 1,
        } as BranchOffice,
        department: {
            id: 2,
        } as Department,
        img: 'https://version.muunyal.app/muunyal.svg',
        isActive: 1,
        role: {
            id: 2,
        } as Role,

    } as User,
];
