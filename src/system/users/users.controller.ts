import { Body, Controller, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../school-colegio-ingles/teachers/entities/teacher.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';

@Crud({
    model: {
        type: User,
    },
    query: {
        exclude: ['password', 'rememberToken'],
        join: {
            teacher: {}, // Teacher;
            role: {},
            department: {},
            campus: {},
            miniStoreBillingInvoices: {},
            miniStoreCancelingInvoices: {},
            miniStoreBillingSales: {},
            miniStoreCancelingSales: {},
            miniStoreBillingPayments: {},
            miniStoreCancelingPayments: {},
            miniStoreCreatorWareHouseOrder: {}, // MiniStoreWarehouseOrder[];
            miniStoreEditorWareHouseOrder: {}, // MiniStoreWarehouseOrder[];
            userCchoolCreatorInscription: {},
            userCchoolEditorInscription: {},
            classroomPermissions: {},
            userAcInsHigh: {},
            userAcInsDown: {},
            salesReturns: {},
            salePayments: {},
            sales: {},
        },
    },
})
@Controller()
export class UsersController implements CrudController<User> {
    constructor(
        readonly service: UsersService,
        @InjectRepository(Teacher, ColegioDBNameConnection) readonly repoTeacher: Repository<Teacher>,
    ) {
    }

    get base(): CrudController<User> {
        return this;
    }

    @Patch('assign-teacher/:idUser')
    async updateUserOfTeacher(@Param('idUser') idUser: string, @Body('teacher') teacherPayload: Partial<Teacher>, @Res() res: Response) {
        try {
            if (idUser.length < 1) {
                res.status(HttpStatus.BAD_REQUEST).send({
                    successful: false,
                    code: 'USER/ERROR/ASSIGN-TEACHER/NOT_USER',
                    message: 'No hay un ID de usuario',
                    error: null,
                });
            }
            if (!teacherPayload || !teacherPayload.id) {
                res.status(HttpStatus.BAD_REQUEST).send({
                    successful: false,
                    code: 'USER/ERROR/ASSIGN-TEACHER/NOT_TEACHER',
                    message: 'No hay un maestro En la solicitud',
                    error: null,
                });
            }
            const user = await this.service.repo.findOneOrFail(idUser, { relations: ['teacher'] });

            if (user.teacher) {
                await this.repoTeacher.update({ id: user.teacher.id }, { user: null });
            }

            const newUserPromiseFind = this.service.repo.findOneOrFail(idUser, {});
            const newTeacherPromiseFind = this.repoTeacher.findOneOrFail(teacherPayload.id, { relations: ['user'] });
            const [newUser, newTeacher] = await Promise.all([newUserPromiseFind, newTeacherPromiseFind]);
            newTeacher.user = newUser;
            const teacherUpdated = await this.repoTeacher.save(newTeacher);
            res.status(HttpStatus.OK)
                .send({
                    successful: true,
                    code: 'USER/SUCCESSFUL/ASSIGN-TEACHER/NEW',
                    message: 'Se ha actualizado el docente con exito',
                    teacher: teacherUpdated,
                });
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                successful: false,
                code: 'USER/ERROR/ASSIGN-TEACHER/REQUEST_TEACHER',
                message: 'Ha ocurrido un error',
                error: e,
            });
        }
    }

    @Post('store')
    async createNewUser(@Body() userBody: Partial<User>, @Req() req, @Res() res: Response) {
        try {
            const { email } = userBody;
            const user: User | undefined = await this.service.findOne({ email });
            if (user) {
                res.status(401);
                res.send({ msg: 'user exist' });
            } else {
                const result = await this.service.save(await this.service.create(userBody));
                res.send(result);
            }
        } catch (e) {
            res.status(401);
            res.send(e);
        }
    }

    @Post('update-password')
    async updatePassword(@Body() userBody: UpdatePasswordDto, @Req() req, @Res() res: Response) {
        try {
            const { id } = userBody;
            const user: User | undefined = await this.service.findOne({ id });
            if (user) {
                const result = await this.service.save(await this.service.changePassword(userBody));
                res.send({ msg: 'password change' });
            } else {
                res.status(401);
                res.send({ msg: 'user no exist' });
            }
        } catch (e) {
            res.status(401);
            res.send(e);
        }
    }
}
