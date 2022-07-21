import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../../common/orm/entities/base.entity';

export class MiniStoreSaleDto extends Base {

  folio: string;

  statusSale: PaymentStatus;

  observations: string | null;

  dateCancellation: Date | null;

  reasonCancellation: string | null;

  iva: number;


  storeBranchOffice: BranchOffice;

}
