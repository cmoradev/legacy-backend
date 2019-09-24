import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    public async registerUserIfNotExist(name: string, email: string, passw: string): Promise<any> {
        let user: User | undefined = await this.usersService.findOne({ email });

        if (user && await bcrypt.compare(passw, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        user = await this.usersService.save(await this.usersService.create({
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
            .findOne({ email }, { relations: ['role', 'role.permissions', 'role.permissions.route', 'role.permissions.route.actions'] });
        if (user && bcrypt.compareSync(passw, user.password.replace('$2y$', '$2a$'))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}
