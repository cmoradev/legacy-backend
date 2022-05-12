import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { FacturacionModerna } from 'invoice-modern';
import * as moment from 'moment-timezone';
import { OptionsFactMod } from 'invoice-modern/lib/interfaces/FactMod';
import { MiniStoreSalePayment } from '../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { AcademyChargeDetails } from '../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { AcademyChargePayments } from '../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { SchoolChargeDetails } from '../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { SchoolChargePayment } from '../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { Response } from 'express';
import { InvoiceModules } from '../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBillig } from '../common/point-of-sale/point-of-sale';
@Controller()
export class InvoiceController {

  @Post('/price-by-payment')
  async priceByPayment(@Body() body: {
    type: InvoiceModules,
    payment: MiniStoreSalePayment | SchoolChargePayment | AcademyChargePayments,
    details: MiniStoreSaleDetail[] | SchoolChargeDetails[] | AcademyChargeDetails[]
  }, @Res() res: Response) {
    const { type, details, payment } = body
    const data = {}
    let factor;
    switch (type) {
      case InvoiceModules.ACADEMY:
        factor = ConceptsPriceByPaymentBillig({
          details,
          payment,
          type,
          application: 2
        });

        break;
      case InvoiceModules.SCHOOL:
        factor = ConceptsPriceByPaymentBillig({
          details,
          payment,
          type,
          ivaDefault: 1,
          ivaByDetail: 0,
        });
        break;
      case InvoiceModules.STORE:
        factor = ConceptsPriceByPaymentBillig({
          details,
          payment,
          type,
        });
        break;
      default:
        break;
    }
    res.send({ ...factor })
  }

  @Post('/egresos')
  async egresos() {

  }
}
