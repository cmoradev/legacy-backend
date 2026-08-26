import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../roles/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../departments/entities/department.entity';
import { BranchOffice } from '../branch-office/entities/branch-office.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { PayloadToken } from '../../common/types/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import * as moment from 'moment';
import { AuthAccessTokensService } from '../auth-access-tokens/auth-access-tokens.service';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ValidateAdminPasswordDto } from './dto/validate-admin-password.dto';
import { CancellationDto } from '../../common/dto/Cancellation.dto';

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
    private readonly tokensService: AuthAccessTokensService,
  ) {}

  public renewToken(token: string): { access_token: string; decode: any } {
    const decode: any = this.jwtService.decode(token);
    return this.generateJWT({ id: decode?.sub, email: decode?.username });
  }

  public async registerUserIfNotExist(userBody: UserBody): Promise<any> {
    const {
      name,
      email,
      passw,
      lastnameMother,
      lastnameFather,
      department,
      role,
      campus,
      status,
    } = userBody;
    let user: User | undefined = await this.usersService.findOne({ email });

    if (user && (await bcrypt.compare(passw, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    const newRole = this.roleRepository.create();
    newRole.id = role;

    const newDepartment = this.departmentRepository.create();
    newDepartment.id = department;

    const newCampus = this.campusRepository.create();
    newCampus.id = campus;

    user = await this.usersService.save(
      await this.usersService.create({
        lastnameFather,
        isActive: status,
        role: newRole,
        department: newDepartment,
        campus: newCampus,
        lastnameMother,
        name,
        email,
        password: passw,
      }),
    );
    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUser(
    email: string,
    passw: string,
  ): Promise<Partial<User> | null> {
    const user:
      | User
      | undefined = await this.usersService.repo
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.role', 'role')
      .leftJoinAndSelect('users.campus', 'campus')
      .leftJoinAndSelect('users.family', 'family')
      .leftJoinAndSelect('users.department', 'department')
      .select([
        'users.id',
        'users.name',
        'users.lastnameFather',
        'users.lastnameMother',
        'users.email',
        'users.password',
        'users.isActive',
        'users.img',
        'family.id',
        'campus.id',
        'campus.name',
        'department.id',
        'department.name',
        'department.description',
        'role.id',
        'role.isActive',
        'role.name',
      ])
      .where('users.email = :email', { email })
      .getOne();
    if (
      user &&
      bcrypt.compareSync(passw, user.password.replace('$2y$', '$2a$'))
    ) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  generateJWT(
    user: Partial<User>,
    expiration: number = 60 * 60 * 10,
  ): { access_token: string; decode: PayloadToken | any } {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: expiration,
    });
    return {
      access_token: token,
      decode: this.jwtService.decode(token),
    };
  }

  async validateAdminPassword(validate: ValidateAdminPasswordDto) {
    try {
      const user = await this.usersService.findOne({
        where: {
          email: validate.email,
          role: { id: 1 },
        },
      });
      if (!user) throw new UnauthorizedException('User not found');

      return bcrypt.compareSync(
        validate.password,
        user.password.replace('$2y$', '$2a$'),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async validateUserCancellation(payload: CancellationDto) {
    const { userID, adminEmail, adminPassword } = payload;

    const user = await this.usersService.findOne({
      where: { id: userID },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.role.id !== 1) {
      const isValid = await this.validateAdminPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (!isValid) {
        throw new UnauthorizedException(
          'Credenciales de administrador incorrecta',
        );
      }
    }

    return user;
  }
}
