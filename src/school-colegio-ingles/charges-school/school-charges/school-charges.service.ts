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
import { CreateSchoolSaleDto } from '../../../common/dto/create-school-sale.dto';
import { Decimal } from '@munyaal/calculations';
import { saleDetailsCalculations } from '../../../common/utils/report/sales.calculation';
import { sumQuantity } from '../../../common/point-of-sale/point-of-sale';

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

    public async createSale(payload: CreateSchoolSaleDto): Promise<SchoolCharge> {
        try {
            return await this.dataSource.transaction(async (manager) => {
                const today = new Date().toISOString().slice(0, 10);

                const totalPayment = Decimal.sub(payload.quantity, payload.change).toNumber();

                const saleInvoiceDetails = saleDetailsCalculations({
                    details: payload.chargesDetails,
                    type: InvoiceModules.SCHOOL,
                });
                const saleTotal = saleInvoiceDetails.total;

                const methodsSubTotal = payload.methodsPayments.reduce(
                    (acc, method) => sumQuantity(acc, method.quantity),
                    0,
                );
                const methodsTotal = Decimal.sub(methodsSubTotal, payload.change).toNumber();

                if (methodsTotal !== totalPayment) {
                    throw new BadRequestException(
                        `La suma de métodos de pago (${methodsTotal}) no coincide con el monto del pago (${totalPayment})`,
                    );
                }

                if (totalPayment > saleTotal) {
                    throw new BadRequestException(
                        `El monto total de pagos (${totalPayment}) excede el total de la venta (${saleTotal})`,
                    );
                }

                const paymentStatus =
                    totalPayment >= saleTotal
                        ? PaymentStatus.PaiOut
                        : PaymentStatus.Abonar;

                const charge = {
                    folio: '',
                    observations: payload.observations,
                    iva: 0,
                    change: payload.change,
                    status: PaymentStatus.PaiOut,
                    schoolCampus: { id: payload.campusId },
                    schoolBranchOfficeSet: { id: payload.branchOfficeSetId },
                    schoolCycle: { id: payload.cycleId },
                    cashier: { id: payload.cashierId },
                    schoolStudent: { id: payload.studentId },
                    chargesDetails: payload.chargesDetails.map((detail) => ({
                        codeConcept: detail.codeConcept,
                        codeUnit: detail.codeUnit,
                        unidad: detail.unidad,
                        concept: detail.concept,
                        quantity: detail.quantity,
                        price: detail.price,
                        schoolPlanPayment: { id: detail.schoolPlanPayment.id },
                        extraCharges: detail.extraCharges || [],
                    })),
                    chargesPayments: [
                        {
                            folio: '',
                            change: payload.change,
                            quantity: payload.quantity,
                            cashierCharge: { id: payload.cashierId },
                            observations: payload.observations,
                            paymentStatus: PaymentStatus.PaiOut,
                            totalWithCharges: payload.totals.totalWithCharges,
                            totalWithoutCharges: payload.totals.totalWithoutCharges,
                            totalDiscount: payload.totals.totalDiscount,
                            totalSurcharges: payload.totals.totalSurcharges,
                            stamping: 0,
                            isIVA: false,
                            schoolPaymentOffice: { id: payload.campusId },
                            schoolPaymentOfficeSet: { id: payload.branchOfficeSetId },
                            methodsPayments: payload.methodsPayments.map((method) => ({
                                Bank: method.Bank,
                                codePaymentMethod: method.codePaymentMethod,
                                date: method.date || today,
                                invoiceMethodPayment: method.invoiceMethodPayment,
                                quantity: method.quantity,
                            })),
                        },
                    ],
                } as any;

                const savedCharge = await manager.save(SchoolCharge, charge);

                /** Actualizar estado y fecha de pago de los SchoolPayment asociados */
                const schoolPaymentIds = payload.chargesDetails.map(
                    (detail) => detail.schoolPlanPayment.id,
                );

                if (schoolPaymentIds.length > 0) {
                    await manager.update(
                        SchoolPayment,
                        { id: In(schoolPaymentIds) },
                        {
                            statusPayment: paymentStatus,
                            paidDate: today as any,
                        },
                    );
                }

                /** Recargar con relaciones para la respuesta */
                return manager.findOne(SchoolCharge, savedCharge.id, {
                    relations: [
                        'chargesPayments',
                        'chargesPayments.methodsPayments',
                        'chargesDetails',
                    ],
                });
            });
        } catch (e) {
            console.error(`Error al crear venta colegio: ${e}`);
            throw new BadRequestException(`Error al crear la venta: ${e.message}`);
        }
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
