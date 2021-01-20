import { sumQuantity } from '../../../../common/point-of-sale/point-of-sale';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { MiniStoreSalePayment } from '../entities/mini-store-sale-payment.entity';

interface ResumeType {
    paymentMethod: InvoiceMethodPayment;
    cashier: User;
    quantity: number;
    change: number;
    total: number;
}

export interface CellRow {
    value: any,
    cashiersId: number | string
}

export function GenerateMatrizByPayment(payments: MiniStoreSalePayment[], paymentMethods: InvoiceMethodPayment[], cashiers: User[]): CellRow[][] {


    const resume: ResumeType[] = [];

    paymentMethods.forEach(paymentMethod => {
        const paymentsByMethod = payments.filter(payment => payment.miniStoreSaleMethodPayments
          .some(method => method.invoiceMethod.id === paymentMethod.id));
        paymentsByMethod.forEach(payment => {
            payment.miniStoreSaleMethodPayments.filter(method => method.invoiceMethod.id === paymentMethod.id)
              .forEach(filteredMethod => {
                  const total = filteredMethod.quantity - (payment.change || 0);
                  resume.push({
                      paymentMethod,
                      cashier: payment.agent,
                      quantity: filteredMethod.quantity,
                      change: payment.change || 0,
                      total,
                  });
              });
        });
    });

    const resumeDataTable = [];

    for (const paymentMethod of paymentMethods) {
        const resumeDataTableItem: CellRow[] = [{
            value: paymentMethod.name,
            cashiersId: '1A',
        }];

        for (const cashier of cashiers) {
            const filteredResume = resume.filter(value => value.paymentMethod.id === paymentMethod.id && value.cashier.id === cashier.id);
            resumeDataTableItem.push({
                value: filteredResume.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.total;
                }, 0),
                cashiersId: cashier.id,

            });
        }


        resumeDataTableItem.push(
          {
              value: resumeDataTableItem.reduce((previousValue, currentValue) => {
                  let amount = 0;
                  if (!isNaN(+currentValue.value)) {
                      amount = +currentValue.value;
                  }
                  return previousValue + amount;
              }, 0),
              cashiersId: 0,
          },
        );

        resumeDataTable.push(resumeDataTableItem);
    }
    const sumtotal = [{ value: 'Total', cashiersId: '1A' }];
    const copyuser = [...cashiers];
    copyuser.push({ id: 0, value: '' } as any);
    for (const cashier of copyuser) {
        let suma: any = 0;
        for (const totalPorForma of resumeDataTable) {
            let i = 0;
            for (const total of totalPorForma) {
                if (total.cashiersId === cashier.id) {
                    if (i > 0) {
                        suma = sumQuantity(suma, total.value);
                    }
                }
                i++;
            }
        }
        sumtotal.push({
            value: suma,
            cashiersId: cashier.id.toString(),
        });
    }
    resumeDataTable.push(sumtotal);
    resumeDataTable.unshift([
        {
            value: 'Total global',
            cashiersId: '1A',
        },
        ...cashiers.map(value => {
            return {
                value: value.name,
                cashiersId: value.id,
            };
        }).concat({
            value: 'Total',
            cashiersId: 0,
        }),
    ]);
    return resumeDataTable;
}
