import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { AcademyCharge } from './entities/academy-charge.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { CancellationDto } from '../../../common/dto/Cancellation.dto';
import { PaymentStatus } from '../../../common/enums/PaymentStatus';
import { AuthService } from '../../../system/auth/auth.service';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyChargeDetails } from '../academy-charge-details/entities/academy-charge-details.entity';
import { AcademyInscriptionConcepts } from '../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';

@Injectable()
export class AcademyChargeService extends TypeOrmCrudService<AcademyCharge> {
    constructor(
        @InjectRepository(AcademyCharge, ColegioDBNameConnection) readonly repo: Repository<AcademyCharge>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        private readonly authService: AuthService,
        @InjectConnection(ColegioDBNameConnection) private readonly dataSource: Connection,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }

    public async cancelSale(id: number, payload: CancellationDto) {
        try {

            const object = await this.findOne(id);

            if (!object) {
                throw new NotFoundException('Venta colegio no encontrado')
            }

            if (object.status === PaymentStatus.Cancelled) {
                throw new BadRequestException('La venta ya está cancelada');
            }

            const {userID, adminEmail, adminPassword, reasonCancellation} = payload;

            const user = await this.userRepository.findOne({
                where: {
                    id: userID
                },
                relations: ['role'],
            });

            if(!user){
                throw new NotFoundException('El usuario para cancelar no encontrado')
            }

            if(user.role.id != 1){   
                const isValid = await this.authService.validateAdminPassword({email: adminEmail, password: adminPassword})
                if (!isValid) {
                    throw new UnauthorizedException('Credenciales de administrador incorrecta');
                }
            }

            return await this.dataSource.transaction(async (manager) => {

                const saleDetails = await manager.find(AcademyChargeDetails, {
                    where: {
                        academyCharge: { id }
                    },
                    relations: ['academyInscriptionConcept']
                });

                console.log(JSON.stringify(saleDetails, null, 3))
                /** Obtener los pagos de los detalles de la venta */
                const payments = saleDetails.map(detail => detail.academyInscriptionConcept.id);
                
                /** Los pagos usados en la venta que se cancelara regresan a su estado inicial */
                await manager.update(
                    AcademyInscriptionConcepts,
                    {id: In(payments)},
                    { 
                        paidDate: null,
                        paymentStatus: PaymentStatus.Debit
                    }
                );

                /** Se cancela la venta */
                const result = await manager.update(
                    AcademyCharge,
                    { id },
                    {
                        reasonsCancellation: reasonCancellation,
                        dateCancellation: new Date(),
                        status: PaymentStatus.Cancelled,
                        cashierCancellation: { id: userID }
                    }
                );

                if (!result.affected) {
                    throw new Error(`No se pudo cancelar la venta ${id}`);
                }

                return id;
            });

        } catch (e) {
            if (e?.status === 401) throw new UnauthorizedException('Credenciales de administrador incorrecta');

            console.error(`Error al cancelar ${id}: ${e}`);

            throw new BadRequestException(`Error al cancelar la venta ${id}`);
        }
    }
}
