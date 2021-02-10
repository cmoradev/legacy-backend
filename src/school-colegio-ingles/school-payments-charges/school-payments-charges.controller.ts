import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@nestjsx/crud';
import { SchoolPaymentCharge } from './entities/school-payment-charge.entity';
import { SchoolPaymentsChargesService } from './school-payments-charges.service';
import { AcademyInscriptionConceptCharges } from '../../academy/academy-inscription-concept-charges/entites/academy-inscription-concept-charges.entity';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
  model: {
    type: SchoolPaymentCharge,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class SchoolPaymentsChargesController implements CrudController<SchoolPaymentCharge> {
  constructor(
    readonly service: SchoolPaymentsChargesService,
  ) {
  }

  get base(): CrudController<SchoolPaymentCharge> {
    return this;
  }
}
