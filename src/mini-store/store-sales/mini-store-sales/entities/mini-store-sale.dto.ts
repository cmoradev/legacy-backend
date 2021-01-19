import  { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { SalesReturns } from '../../mini-store-sales-returns/entities/sales-returns.entity';
import { Student } from '../../../../school-colegio-ingles/students/entities/student.entity';
import { Cycle } from '../../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { MiniStoreQuotation } from '../../mini-store-quotation/entities/mini-store-quotation.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@ObjectType('tie_ventas')
export class MiniStoreSaleDto extends Base {

  @Field()
  folio: string;

  @Field()
  statusSale: PaymentStatus;

  @Field({ nullable: true})
  observations: string | null;

  @Field({ nullable: true})
  dateCancellation: Date | null;

  @Field({ nullable: true})
  reasonCancellation: string | null;

  @Field(type => Int)
  iva: number;


  @Field(() => BranchOffice)
  storeBranchOffice: BranchOffice;

}
