import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { Connection, In, Repository } from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import * as moment from 'moment';
import {
  IQueryReportSaleToday,
  IQueryReportSaleTodayOp,
  IReportInformativeRow,
  IReportSaleTodayRow,
} from './types/IReport';
import {
  NotInvoiced,
  VWPaymentExtraCharge,
} from '../../../common/interface/not-invoiced.interface';
import { PaymentStatus } from 'src/common/enums/PaymentStatus';
import { CancellationDto } from '../../../common/dto/Cancellation.dto';
import { User } from '../../../system/users/entities/user.entity';
import { AuthService } from '../../../system/auth/auth.service';
import { MiniStoreSaleDetail } from '../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { Decimal } from '@munyaal/calculations';

@Injectable()
export class MiniStoreSalesService extends TypeOrmCrudService<MiniStoreSale> {
  constructor(
    @InjectConnection(ColegioDBNameConnection)
    private connection: Connection,
    @InjectRepository(MiniStoreSale, ColegioDBNameConnection)
    readonly repo: Repository<MiniStoreSale>,
    @InjectRepository(User, ColegioDBNameConnection)
    readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    @InjectConnection(ColegioDBNameConnection)
    private readonly dataSource: Connection,
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

  async reportCatCasherProd(query: {
    status: number;
    startDate: Date;
    endDate: Date;
    cashier?: number;
    branchOfficeId: number;
  }) {
    const sales = this.repo
      .createQueryBuilder('sales')
      .leftJoinAndSelect('sales.storeBranchOffice', 'storeBranchOffice')
      .leftJoinAndSelect('sales.cashier', 'cashier')
      .leftJoinAndSelect('sales.miniStoreSaleDetails', 'details')
      .leftJoinAndSelect('details.miniStoreClassification', 'clasification')
      .leftJoinAndSelect('details.extraCharges', 'charges')
      .leftJoinAndSelect('details.miniStoreProduct', 'product')
      .select([
        'sales.id',
        'sales.folio',
        'sales.statusSale',
        'sales.observations',
        'sales.iva',
        'sales.isIVA',
        'sales.createdAt',
        'details.id',
        'details.productCode',
        'details.productName',
        'details.quantity',
        'details.unitMeasurement',
        'details.priceWithIVA',
        'details.price',
        'clasification.id',
        'clasification.name',
        'charges',
        'product.id',
        'product.IVA',
        'cashier.id',
        'cashier.name',
        'cashier.lastnameFather',
        'cashier.lastnameMother',
      ])
      .where('storeBranchOffice.id= :officeId', {
        officeId: query.branchOfficeId,
      })
      .andWhere('sales.statusSale= :status', {
        status: query.status,
      })
      .andWhere('sales.createdAt BETWEEN :startDate AND :endDate', {
        startDate: moment(query.startDate).startOf('day').toDate(),
        endDate: moment(query.endDate).endOf('day').toDate(),
      });
    /*sif (query.cashier) {
            sales.andWhere('cashier.id = :cashier', { cashier: query.cashier });
        }*/

    return await sales.getMany();
  }

  public async reportSaleToday({
    status,
    startDate,
    endDate,
    cycleId,
    branchOfficeId,
  }: IQueryReportSaleTodayOp): Promise<IReportSaleTodayRow[]> {
    let queryString = `SELECT * FROM vw_tie_sale_today where createdAt BETWEEN '${startDate}' AND '${endDate}'`;

    if (status) {
      queryString = `${queryString} AND id_estado_pago = ${status}`;
    }
    if (cycleId) {
      queryString = `${queryString} AND cycleId = ${cycleId}`;
    }
    if (branchOfficeId) {
      queryString = `${queryString} AND branchOfficeId = ${branchOfficeId}`;
    }
    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  public async reportInformative({
    startDate,
    endDate,
    cycleId,
    branchOfficeId,
  }: IQueryReportSaleToday): Promise<IReportInformativeRow[]> {
    let queryString = `SELECT * FROM vw_tie_informative where v_createdAt BETWEEN '${startDate}' AND '${endDate}'`;

    if (cycleId) {
      queryString = `${queryString} AND v_cycleId = ${cycleId}`;
    }
    if (branchOfficeId) {
      queryString = `${queryString} AND v_storeBranchOfficeId = ${branchOfficeId}`;
    }
    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  public async reportSales({
    startDate,
    endDate,
    cycleId,
    branchOfficeId,
  }: IQueryReportSaleTodayOp): Promise<VWPaymentExtraCharge[]> {
    let queryString = `SELECT * FROM vw_tie_sales where v_created_at BETWEEN '${startDate}' AND '${endDate}' AND v_status = 2`;

    if (cycleId) {
      queryString = `${queryString} AND v_cycle = ${cycleId}`;
    }
    if (branchOfficeId) {
      queryString = `${queryString} AND v_branch_office = ${branchOfficeId}`;
    }
    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  public async reportSalesReturns({
    startDate,
    endDate,
    cycleId,
    branchOfficeId,
  }: IQueryReportSaleTodayOp): Promise<NotInvoiced[]> {
    let queryString = `SELECT * FROM vw_tie_sales where vd_created_at BETWEEN '${startDate}' AND '${endDate}' AND v_status = 4`;

    if (cycleId) {
      queryString = `${queryString} AND v_cycle = ${cycleId}`;
    }
    if (branchOfficeId) {
      queryString = `${queryString} AND v_branch_office = ${branchOfficeId}`;
    }
    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  public async cancelSale(id: number, payload: CancellationDto) {
    try {
      const object = await this.findOne(id);

      if (!object) {
        throw new NotFoundException('Venta tienda no encontrado');
      }

      if (object.statusSale === PaymentStatus.Cancelled) {
        throw new BadRequestException('La venta ya está cancelada');
      }

      const { reasonCancellation, userID } = payload;

      // const user = await this.authService.validateUserCancellation(payload);

      return await this.dataSource.transaction(async (manager) => {
        const saleDetails = await manager
          .createQueryBuilder(MiniStoreSaleDetail, 'details')
          .leftJoinAndSelect('details.miniStoreSale', 'sale')
          .leftJoinAndSelect('details.miniStoreProduct', 'product')
          .select([
            'details.id',
            'details.quantity',
            'sale.id',
            'product.id',
            'product.stock',
          ])
          .where('sale.id = :saleId', { saleId: id })
          .getMany();

        for (const detail of saleDetails) {
          await manager.update(
            MiniStoreProduct,
            { id: detail.miniStoreProduct.id },
            {
              stock: Decimal.add(
                detail.miniStoreProduct.stock,
                detail.quantity,
              ).toNumber(),
            },
          );
        }

        /** Se cancela la venta */

        const result = await manager.update(
          MiniStoreSale,
          { id },
          {
            reasonCancellation: reasonCancellation,
            dateCancellation: new Date(),
            statusSale: PaymentStatus.Cancelled,
            agentCanceling: { id: userID },
          },
        );

        if (!result.affected) {
          throw new Error(`No se pudo cancelar la venta tienda ${id}`);
        }

        return id;
      });
    } catch (e) {
      if (e?.status === 401)
        throw new UnauthorizedException(
          'Credenciales de administrador incorrecta',
        );

      console.error(`Error al cancelar venta tienda${id}: ${e}`);

      throw new BadRequestException(`Error al cancelar la venta tienda ${id}`);
    }
  }
}
