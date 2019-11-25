import { Injectable } from '@nestjs/common';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { StatusInvoce } from '../../invoice/interface/StatusInvoce.interface';

@Injectable()
export class MiniStoreDashBoardService {
  constructor(
    readonly miniStoreInvoicesService: MiniStoreInvoicesService,
  ) {
  }

  public async loadDash() {
    return {
      activeInvoice: await this.activeInvoice(),
      cancelledInvoice: await this.cancelledInvoice(),
      progressCacelacionInvoice: await this.inProgressCacelacionInvoice(),
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
    return await this.miniStoreInvoicesService.repo.count({
      where: { status: StatusInvoce.cancellationProcess },
    });
  }
}
