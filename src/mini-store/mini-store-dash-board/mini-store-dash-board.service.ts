import { Injectable } from '@nestjs/common';
import { MiniStoreInvoicesService } from '../store-sales/mini-store-invoices/mini-store-invoices.service';
import { StatusInvoce } from '../../invoice/interface/StatusInvoce.interface';
import { UsersService } from '../../system/users/users.service';
import { MiniStoreSalesPaymentsService } from '../store-sales/mini-store-sales-payments/mini-store-sales-payments.service';
import * as moment from 'moment';

@Injectable()
export class MiniStoreDashBoardService {
  constructor(
    readonly miniStoreInvoicesService: MiniStoreInvoicesService,
    readonly userService: UsersService,
    readonly miniStoreSalesPaymentsService: MiniStoreSalesPaymentsService,
  ) {
  }

  public async loadDash() {
    return {
      activeInvoice: await this.activeInvoice(),
      cancelledInvoice: await this.cancelledInvoice(),
      progressCacelacionInvoice: await this.inProgressCacelacionInvoice(),
      activeCashiers: await this.activeCashiers(),
    };
  }

  public async activeInvoice() {
    return await this.miniStoreInvoicesService.repo.count({
      where: [
        { status: StatusInvoce.invoiced },
        { status: StatusInvoce.cancellationProcess },
        { status: StatusInvoce.notCancelable },
      ],
    });
  }

  public async cancelledInvoice() {
    return await this.miniStoreInvoicesService.repo.count({
      where: { status: StatusInvoce.cancelled },
    });
  }

  public async inProgressCacelacionInvoice() {
    return await this.miniStoreInvoicesService.repo.count({
      where: { status: StatusInvoce.cancellationProcess },
    });
  }

  public async activeCashiers() {
    return await this.userService.forDepartament(2);
  }

  public async myIncome(date: string, id: number) {
    return await this.miniStoreSalesPaymentsService.countTotalPayments(date, date, id);
  }

  public async cashierSales(query: { branchOfficeId: number, startDate: string, endDate: string, }) {

    return await this.userService.repo.createQueryBuilder('users')
      .leftJoin('users.sales', 'sale', `sale.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: moment(query.startDate).startOf('day').toISOString(),
        endDate: moment(query.endDate).endOf('day').toISOString(),
      })
      .leftJoin('sale.storeBranchOffice', 'storeBranchOffice')
      .leftJoin('users.department', 'department')
      .where('department.id = :departmentID', { departmentID: 2 })
      .andWhere('storeBranchOffice.id= :officeId', {
        officeId: query.branchOfficeId,
      })
      .select(['users.id as id', 'users.name as name', 'users.img as picture'])
      .addSelect('COUNT(distinct sale.id) as sales')
      .groupBy('users.id')
      .getRawMany();
  }

  public async salesGraphic(query: { month: string, year: string,}){
    return await this.miniStoreSalesPaymentsService.repo.createQueryBuilder('sales')
    .select(['SUM(sales.quantity) - SUM(sales.change ) as total, MONTH(sales.createdAt) as mes'])
    .where('MONTH(sales.createdAt) = :month', {month: query.month})
    .andWhere('YEAR(sales.createdAt) = :year', {year: query.year})
    .groupBy('mes')
    .getRawOne();
  }
}
