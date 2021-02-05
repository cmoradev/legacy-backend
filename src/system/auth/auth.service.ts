import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
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
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import * as moment from 'moment';
import { AuthAccessTokensService } from '../auth-access-tokens/auth-access-tokens.service';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

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
    // const user: User | undefined = await this.usersService
    //     .findOne({ email }, {
    //         relations: [
    //             'role',
    //             'campus',
    //             'department',
    //             'role.permissions',
    //             'role.permissions.route',
    //             'role.permissions.actions',
    //         ],
    //     });
    const user: User | undefined = await this.usersService.repo.createQueryBuilder('users')
      .leftJoinAndSelect('users.role', 'role')
      .leftJoinAndSelect('users.campus', 'campus')
      .leftJoinAndSelect('users.department', 'department')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .leftJoinAndSelect('permissions.route', 'route')
      .leftJoinAndSelect('permissions.actions', 'actions')
      .select([
        'users.id', 'users.name', 'users.lastnameFather', 'users.lastnameMother',
        'users.email', 'users.password', 'users.isActive', 'users.img',
        'campus.id', 'campus.name',
        'department.id', 'department.name', 'department.description',
        'role.id', 'role.isActive', 'role.name', 'permissions.id',
        'route.id', 'route.isActive', 'route.name', 'route.fatherID',
        'route.level', 'route.url', 'route.icon',
        'actions.id',
      ])
      .where('users.email = :email', { email })
      .getOne();
    if (user && bcrypt.compareSync(passw, user.password.replace('$2y$', '$2a$'))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  generateJWT(user: Partial<User>, expiration: number = 86400): { access_token: string, decode: PayloadToken | any } {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: expiration,
    });
    return {
      access_token: token,
      decode: this.jwtService.decode(token),
    };
  }

  async sendMailForgotPassword(email: string, token: string, clientUrl: string) {
    const environment = process.env.NODE_ENV || 'development';
    const processEnv: any = dotenv.parse(fs.readFileSync(`${ environment }.env`));
    const transporter = nodemailer.createTransport({
      service: 'gmail.com',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: processEnv.API_MAIL,
        pass: processEnv.API_MAIL_PASSWORD,
      },
    });
    const mailOptions: Mail.Options = {
      to: email,
      from: processEnv.API_MAIL,
      subject: 'Recuperación de contraseña',
      html: `
      <div>
        <h2>Recuperación de contraseña</h2>
         <p>
            Ha solicitado recuperar su contraseña.
            Si fue usted haga click en el enlace que se encuentra debajo. De lo contrario, ignore este correo.
        </p>
        <a href='${ clientUrl }/#/reset-password/${ token }'>Recuperar contraseña</a>
      </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  }

  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    try {
      const user = await this.usersService.findOne({
        where: {
          email: forgotPassword.email,
        },
      });

      if (!user) throw new BadRequestException('User not found');
      const jwt = this.generateJWT(user, 300);
      await this.tokensService.saveToken({
        name: 'Forgot Token',
        userId: user.id,
        jwt: jwt.access_token,
        isActive: true,
        refresh: false,
        revoked: false,
        clientId: 1,
        expiresAt: moment().add(5, 'minutes').toDate(),
      });
      await this.sendMailForgotPassword(user.email, jwt.access_token, forgotPassword.clientUrl);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e.message);
    }
  }
}
