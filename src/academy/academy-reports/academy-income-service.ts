import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { AcademyIncomeQuery } from './dto';
import { startOfDay, endOfDay } from 'date-fns';
import {
  AcademyIncomeDetailsRow,
  AcademyIncomeRow,
  ChargeDetailsRow,
  SummaryRow,
} from './types';
import { academyIncomeQuery } from './query';
import { ExcelDocument } from 'src/reports';
import {
  ChargeTypeEnum,
  ChargeApplicationEnum,
  calculateInvoicePrices,
  FountTypeEnum,
  Concept,
  Decimal,
} from '@munyaal/calculations';
import * as moment from 'moment';
import { TableColumnProperties } from 'exceljs';
import { TypeChargeApplicationEnum } from '../../system/system-extra-charges/enums/system-extra-charges.enum';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { format } from 'date-fns';
import { getPriceWithIva } from '../../common/functions';
const esMx = require('moment/locale/es-mx');

export class AcademyIncomeService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los datos de ingresos por academias.
   * @param query - Consulta de ingresos por academias.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async getData(query: AcademyIncomeQuery) {
    // Obtengo conceptos
    const concepts = await this.getDetailsOfIncome(query);

    const conceptIDs = concepts.map((row) => row.id_concepto);
    // Obtenego cargos aplicados en los conceptos
    const charges = await this.getChargesOfDetails(conceptIDs);

    const rows: AcademyIncomeDetailsRow[] = this.recalculateConceptsWithCharges(
      concepts,
      charges,
    );

    const dic: { [key: string]: SummaryRow } = rows.reduce((acc, row) => {
      if (!acc[`${row.id_academia}`]) {
        acc[`${row.id_academia}`] = {
          id: row.id_academia,
          title: row.academia,
          amountWithCharges: row.amountWithCharges,
          amountWithoutCharges: row.amountWithoutCharges,
          discount: row.discount,
          surcharge: row.surcharge,
        };
      } else {
        acc[`${row.id_academia}`].amountWithCharges += row.amountWithCharges;
        acc[`${row.id_academia}`].amountWithoutCharges +=
          row.amountWithoutCharges;
        acc[`${row.id_academia}`].discount += row.discount;
        acc[`${row.id_academia}`].surcharge += row.surcharge;
      }
      return acc;
    }, Object.assign({}));

    const academies: SummaryRow[] = Object.values(dic);

    academies.sort((a, b) => b.amountWithoutCharges - a.amountWithoutCharges);

    return {
      rows,
      academies,
    };
  }

  /**
   * Genera un documento Excel con los datos de ingresos por academias.
   * @param rows - Filas de ingresos por academias.
   * @param matriz - Matriz de resumen de ingresos por academias.
   * @returns Un documento Excel con los datos de ingresos.
   */
  public async buildDocument(
    rows: AcademyIncomeDetailsRow[],
    matriz: SummaryRow[],
  ) {
    const excel = new ExcelDocument();

    const worksheet = excel.addWorksheet('Ingresos por academias');

    worksheet.columns = [
      { key: 'A', width: 10 },
      { key: 'B', width: 20 },
      { key: 'C', width: 20 },
      { key: 'D', width: 20 },
      { key: 'E', width: 20 },
      { key: 'F', width: 20 },
      { key: 'G', width: 20 },
      { key: 'H', width: 20 },
      { key: 'I', width: 20 },
      { key: 'J', width: 20 },
      { key: 'K', width: 20 },
      { key: 'L', width: 20 },
      { key: 'M', width: 20 },
      { key: 'N', width: 20 },
      { key: 'O', width: 20 },
      { key: 'P', width: 20 },
      { key: 'Q', width: 20 },
    ];
    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:O${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Ingresos por academias';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:O${lastRow}`);
    const subtitle = worksheet.getCell(`B${lastRow}`);
    subtitle.value = `Reporte emitido en ${moment()
      .locale('es')
      .format('lll')}`;
    subtitle.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    subtitle.font = { bold: true, size: 12 };
    lastRow += 2;

    const summaryColumns: TableColumnProperties[] = [
      { name: 'Academia', filterButton: true },
      {
        name: 'Importe',
        filterButton: false,
        totalsRowFunction: 'sum',
      },
      {
        name: 'Descuento',
        filterButton: false,
        totalsRowFunction: 'sum',
      },
      {
        name: 'Recargo',
        filterButton: false,
        totalsRowFunction: 'sum',
      },
      {
        name: 'Cobrado',
        filterButton: false,
        totalsRowFunction: 'sum',
      },
    ];

    const summaryRows = matriz.map((row) => [
      row.title,
      row.amountWithoutCharges,
      row.discount,
      row.surcharge,
      row.amountWithCharges,
    ]);

    worksheet.addTable({
      displayName: 'Resumen',
      name: 'Resumen',
      ref: `B${lastRow}`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: summaryColumns,
      rows: summaryRows,
    });
    lastRow += matriz.length + 3;

    const dataColumns: TableColumnProperties[] = [
      { name: 'Matricula', filterButton: true },
      { name: 'Alumno', filterButton: true },
      { name: 'Folio Venta', filterButton: true },
      { name: 'Fecha Venta', filterButton: true },
      { name: 'Hora Venta', filterButton: false },
      { name: 'Folio Pago', filterButton: true },
      { name: 'Fecha Pago', filterButton: true },
      { name: 'Hora Pago', filterButton: false },
      { name: 'Academia', filterButton: true },
      { name: 'Concepto', filterButton: false },
      { name: 'Importe', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Descuento', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Recargo', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Cobrado sin iva', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'IVA', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Cobrado', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = rows.map((row) => {
      const { amount, base, tax} = getPriceWithIva({base: new Decimal(row.amountWithCharges), ivaPercentage: 0.16})
      return [
        row.matricula_alumno,
        row.nombre_alumno,
        row.folio_venta,
        format(row.fecha_venta, 'dd/MM/yyyy'),
        format(row.fecha_venta, 'pp'),
        row.folio_pago,
        format(row.fecha_pago, 'dd/MM/yyyy'),
        format(row.fecha_pago, 'pp'),
        row.academia,
        row.concepto,
        row.amountWithoutCharges,
        row.discount,
        row.surcharge,
        parseFloat(amount.toFixed(2)),
        parseFloat(tax.toFixed(2)),
        parseFloat(base.toFixed(2)),
      ]
    });

    worksheet.addTable({
      displayName: 'Datos',
      name: 'Datos',
      ref: `B${lastRow}`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: dataColumns,
      rows: dataRows,
    });

    return excel;
  }

  /**
   * Obtiene los detalles de ventas entre un rango de fechas y un estado especifico.
   * @param query - Consulta de ingresos por academias.
   * @returns Una lista de detalles de ingresos.
   */
  private async getDetailsOfIncome(
    query: AcademyIncomeQuery,
  ): Promise<AcademyIncomeRow[]> {
    const paymentStatus = parseInt(`${query.paymentStatus}`);

    const status = [paymentStatus];

    if (paymentStatus === PaymentStatus.PaiOut) {
      status.push(PaymentStatus.Abonar);
      status.push(PaymentStatus.Debit);
    }

    const startDate = startOfDay(`${query.startDate}T12:00:00`).toISOString();

    const endDate = endOfDay(`${query.endDate}T12:00:00`).toISOString();

    const rows: AcademyIncomeRow[] = await this.connection.query(
      academyIncomeQuery.replace('@params', status.map(() => '?').join(',')),
      [startDate, endDate, ...status],
    );

    return rows.map((row) => ({
      ...row,
      cobrado: parseFloat(`${row.cobrado}`),
      precio: parseFloat(`${row.precio}`),
      id_concepto: parseInt(`${row.id_concepto}`),
      id_pago: parseInt(`${row.id_pago}`),
      id_venta: parseInt(`${row.id_venta}`),
      id_academia: parseInt(`${row.id_academia}`),
      id_alumno: parseInt(`${row.id_alumno}`),
      nombre_alumno: `${row.nombre_alumno}`
        .trim()
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    }));
  }

  /**
   * Recalcula los conceptos/detalles de venta con los cargos aplicados.
   *
   * Se agrupan los conceptos por venta y se recalculan los cargos aplicados segun lo cobrado.
   *
   * @param concepts - Lista de conceptos de ingresos.
   * @param charges - Lista de cargos aplicados a los conceptos.
   * @returns Una lista de filas de ingresos con los cargos recalculados.
   */
  private recalculateConceptsWithCharges(
    concepts: AcademyIncomeRow[],
    charges: ChargeDetailsRow[],
  ): AcademyIncomeDetailsRow[] {
    const rows: AcademyIncomeDetailsRow[] = [];

    // Agrupo los conceptos por venta
    const sales = concepts.reduce((acc, row) => {
      if (!acc[`${row.id_venta}`]) {
        acc[`${row.id_venta}`] = [row];
      } else {
        acc[`${row.id_venta}`]?.push(row);
      }
      return acc;
    }, {});

    // Por cada venta se recalculan los cargos aplicados segun lo cobrado
    for (const saleID in sales) {
      if (Object.prototype.hasOwnProperty.call(sales, saleID)) {
        const details = sales[`${saleID}`];

        const payments: { [key: string]: number } = details.reduce(
          (acc, detail) => {
            if (!acc[`${detail.id_pago}`]) {
              acc[`${detail.id_pago}`] = detail.cobrado;
            }
            return acc;
          },
          {},
        );

        const cobrado = Object.values(payments).reduce(
          (acc, row) => acc + row,
          0,
        );

        const { detailsWithPaymentApplied } = calculateInvoicePrices({
          fountType: FountTypeEnum.DISCOUNT_ON_DISCOUNT,
          ivaPercentage: 0.16,
          concepts: details.map(
            (detail): Concept<AcademyIncomeRow> => {
              const chargesApplied = charges.filter(
                (charge) => charge.id_detalle === detail.id_concepto,
              );

              return {
                id: detail.id_concepto,
                name: detail.concepto,
                charges: chargesApplied.map((charge) => ({
                  amount: charge.quantity,
                  application: charge.applcation,
                  type: charge.type,
                  order: charge.order,
                })),
                quantity: 1,
                basePrice: detail.precio,
                data: detail,
              };
            },
          ),
          payment: {
            amount: cobrado,
            change: 0,
          },
        });

        const concepts: AcademyIncomeDetailsRow[] = detailsWithPaymentApplied.concepts.map(
          (concept) => ({
            ...concept.data,
            amountWithCharges: concept.amountWithCharges.toNumber(),
            amountWithoutCharges: concept.amountWithoutCharges.toNumber(),
            discount: concept.discountWithIVA.toNumber(),
            surcharge: concept.chargeWithIVA.toNumber(),
          }),
        );

        rows.push(...concepts);
      }
    }

    return rows;
  }

  /**
   * Obtiene los cargos aplicados en los conceptos/detalles de venta
   * @param ids - Lista de IDs de conceptos/detalles de venta.
   * @returns Una lista de detalles de cargos aplicados.
   */
  private async getChargesOfDetails(
    ids: number[],
  ): Promise<ChargeDetailsRow[]> {
    if (!!ids.length) {
      const params = ids.map((id) => `?`).join(',');

      const query = `
      SELECT 
        c.id              as id,
        c.name            as description,
        c.quantity        as quantity,
        c.applicationType as applcation,
        c.operationType   as operation,
        c.typeExtraCharge as internalType,
        c.chargeDetailId  as id_detalle
      FROM ac_charges_details_extra_charges c
  
      WHERE c.chargeDetailId IN (${[params]});`;

      const rows: any[] = await this.connection.query(query, ids);

      return rows.map((row) => {
        let order = 0;

        if (row.internalType == SystemTypeExtraChargesEnum.Becas) {
          order = 1;
        } else if (row.internalType == SystemTypeExtraChargesEnum.Descuentos) {
          order = 2;
        } else if (row.internalType == SystemTypeExtraChargesEnum.Recargos) {
          order = 3;
        }

        return {
          ...row,
          id: parseInt(`${row.id}`),
          quantity: parseFloat(`${row.quantity}`),
          id_detalle: parseInt(`${row.id_detalle}`),
          type:
            row.internalType == SystemTypeExtraChargesEnum.Recargos
              ? ChargeTypeEnum.SURCHARGES
              : ChargeTypeEnum.DISCOUNTS,
          applcation:
            row.applcation == TypeChargeApplicationEnum.percentage
              ? ChargeApplicationEnum.PERCENTAGE
              : ChargeApplicationEnum.QUANTITY,
          order,
        };
      });
    }
    return [];
  }
}
