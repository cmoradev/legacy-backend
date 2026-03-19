import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { SchoolCharge } from './entities/school-charge.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { CancellationDto } from '../../../common/dto/Cancellation.dto';
import { User } from '../../../system/users/entities/user.entity';
import { AuthService } from '../../../system/auth/auth.service';
import { PaymentStatus } from '../../../common/enums/PaymentStatus';
import { SchoolChargeDetails } from '../school-charges-details/entities/school-charge-details.entity';
import { SchoolPayment } from '../../school-payments/entities/school-payment.entity';
import { ConceptsByDetailsSale } from '../../../common/cancellation/concepts';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';

@Injectable()
export class SchoolChargesService extends TypeOrmCrudService<SchoolCharge> {
    constructor(
        @InjectRepository(SchoolCharge, ColegioDBNameConnection) repo: Repository<SchoolCharge>,
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
    
                const { reasonCancellation} = payload;

                const user = await this.authService.validateUserCancellation(payload);

                return await this.dataSource.transaction(async (manager) => {

                    const conceptIds = await ConceptsByDetailsSale({id, type: 'sale', tpv: InvoiceModules.SCHOOL, manager})
                    
                    /** Los pagos usados en la venta que se cancelara regresan a su estado inicial */
                    await manager.update(
                        SchoolPayment,
                        {id: In(conceptIds)},
                        { 
                            statusPayment: PaymentStatus.Debit,
                            paidDate: null
                        }
                    );

                    /** Se cancela la venta */
                    const result = await manager.update(
                        SchoolCharge,
                        { id },
                        {
                            reasonsCancellation: reasonCancellation,
                            dateCancellation: new Date(),
                            status: PaymentStatus.Cancelled,
                            cashierCancellation: { id: user.id }
                        }
                    );

                    if (!result.affected) {
                        throw new Error(`No se pudo cancelar la venta colegio ${id}`);
                    }

                    return id;
                });

            } catch (e) {
                if (e?.status === 401) throw new UnauthorizedException('Credenciales de administrador incorrecta');
    
                console.error(`Error al cancelar venta colegio ${id}: ${e}`);
    
                throw new BadRequestException(`Error al cancelar la venta colegio ${id}`);
            }
        }
}
