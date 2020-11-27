import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Role } from '../roles/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../departments/entities/department.entity';
import { BranchOffice } from '../branch-office/entities/branch-office.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { PayloadToken } from '../../common/types/jwt';

interface UserBody {
    name: string;
    email: string;
    passw: string;
    lastnameFather: string;
    lastnameMother: string;
    department: number;
    role: number;
    campus: number;
    status: number;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(Role, ColegioDBNameConnection)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Department, ColegioDBNameConnection)
        private readonly departmentRepository: Repository<Department>,
        @InjectRepository(BranchOffice, ColegioDBNameConnection)
        private readonly campusRepository: Repository<BranchOffice>,
        private readonly jwtService: JwtService,
    ) {
    }

    public async registerUserIfNotExist(userBody: UserBody): Promise<any> {
        const { name, email, passw, lastnameMother, lastnameFather, department, role, campus, status } = userBody;
        let user: User | undefined = await this.usersService.findOne({ email });

        if (user && await bcrypt.compare(passw, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        const newRole = this.roleRepository.create();
        newRole.id = role;

        const newDepartment = this.departmentRepository.create();
        newDepartment.id = department;

        const newCampus = this.campusRepository.create();
        newCampus.id = campus;

        user = await this.usersService.save(await this.usersService.create({
            lastnameFather,
            isActive: status,
            role: newRole,
            department: newDepartment,
            campus: newCampus,
            lastnameMother,
            name,
            email,
            password: passw,
        }));
        if (user) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async validateUser(email: string, passw: string): Promise<Partial<User> | null> {
        const user: User | undefined = await this.usersService
            .findOne({ email }, {
                relations: [
                    'role',
                    'campus',
                    'department',
                    'role.permissions',
                    'role.permissions.route',
                    'role.permissions.actions',
                ],
            });
        if (user && bcrypt.compareSync(passw, user.password.replace('$2y$', '$2a$'))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    generateJWT(user: Partial<User>): { access_token: string, decode: PayloadToken | any } {
        const payload = { username: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            decode: this.jwtService.decode(token),
        };
    }
}
