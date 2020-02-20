import { Injectable } from '@nestjs/common';
import { MiniStoreInvoicesService } from '../store-sales/mini-store-invoices/mini-store-invoices.service';
import { StatusInvoce } from '../../invoice/interface/StatusInvoce.interface';
import { UsersService } from '../../system/users/users.service';
import { MiniStoreSalesPaymentsService } from '../store-sales/mini-store-sales-payments/mini-store-sales-payments.service';

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
}
