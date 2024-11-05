import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { startOfDay, endOfDay } from 'date-fns';
import { ExcelDocument } from 'src/reports';
import {
  ChargeTypeEnum,
  ChargeApplicationEnum,
  calculateInvoicePrices,
  FountTypeEnum,
  Concept,
} from '@munyaal/calculations';
import * as moment from 'moment';
import { TableColumnProperties } from 'exceljs';
import { TypeChargeApplicationEnum } from 'src/system/system-extra-charges/enums/system-extra-charges.enum';
import { SystemTypeExtraChargesEnum } from 'src/system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { PaymentStatus } from 'src/common/enums/PaymentStatus';
import { SchoolIncomeGroupQuery as IncomeGroupQuery } from './dto';
import { SchoolIncomeDetailsGroupRow, SchoolIncomeGroupRow, SchoolSummaryRow } from './types';
import { SchoolChargeDetailsRow } from './types/school.charge.details.row.type';
import { SchoolIncomeGroupQuery } from './query';
import { getPriceWithIva } from '../../common/functions';
import { Decimal } from '@munyaal/calculations';
const esMx = require('moment/locale/es-mx');

export class SchoolIncomeGroupService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los datos de ingresos por los grados de colegio.
   * @param query - Consulta de ingresos por grados de colegio.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async getData(query: IncomeGroupQuery) {
    // Conceptos
    const concepts = await this.getDetailsOfIncome(query);

    const conceptIDs = concepts.map((row) => row.id_concepto);
    // Conceptos con cargos aplicados
    const charges = await this.getChargesOfDetails(conceptIDs);

    const rows: SchoolIncomeDetailsGroupRow[] = this.recalculateConceptsWithCharges(
      concepts,
      charges,
    );

    const dic: { [key: string]: SchoolSummaryRow } = rows.reduce((acc, row) => {
      if (!acc[`${row.id_grado}`]) {
        acc[`${row.id_grado}`] = {
          id: row.id_grado,
          title: row.nivel + ' - ' + row.grado,
          amountWithCharges: row.amountWithCharges,
          amountWithoutCharges: row.amountWithoutCharges,
          discount: row.discount,
          surcharge: row.surcharge,
        };
      } else {
        acc[`${row.id_grado}`].amountWithCharges += row.amountWithCharges;
        acc[`${row.id_grado}`].amountWithoutCharges +=
          row.amountWithoutCharges;
        acc[`${row.id_grado}`].discount += row.discount;
        acc[`${row.id_grado}`].surcharge += row.surcharge;
      }
      return acc;
    }, Object.assign({}));

    const groups: SchoolSummaryRow[] = Object.values(dic);

    groups.sort((a, b) => b.amountWithoutCharges - a.amountWithoutCharges);

    return {
      rows,
      groups,
    };
  }

  /**
   * Genera un documento Excel con los datos de ingresos por grados academicos.
   * @param rows - Filas de ingresos por grados.
   * @param matriz - Matriz de resumen de ingresos por grados academicos.
   * @returns Un documento Excel con los datos de ingresos.
   */
  public async buildDocument(
    rows: SchoolIncomeDetailsGroupRow[],
    matriz: SchoolSummaryRow[],
  ) {
    const excel = new ExcelDocument();

    const worksheet = excel.addWorksheet('Ingresos por grupos de colegio');

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
    ];
    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:M${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Ingresos por academias';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:M${lastRow}`);
    const subtitle = worksheet.getCell(`B${lastRow}`);
    subtitle.value = `Reporte emitido en ${moment().utc(true)
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
      { name: 'Matricula', filterButton: false },
      { name: 'Alumno', filterButton: false },
      { name: 'Folio Venta', filterButton: false },
      { name: 'Fecha Venta', filterButton: false },
      { name: 'Folio Pago', filterButton: false },
      { name: 'Fecha Pago', filterButton: false },
      { name: 'Nivel', filterButton: true },
      { name: 'Grado', filterButton: true },
      { name: 'Grupo', filterButton: true },
      { name: 'Concepto', filterButton: false },
      { name: 'Importe', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Discuento', filterButton: false, totalsRowFunction: 'sum' },
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
        moment(row.fecha_venta).format('lll'),
        row.folio_pago,
        moment(row.fecha_pago).format('lll'),
        row.nivel,
        row.grado,
        row.grupo,
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
   * @param query - Consulta.
   * @returns Una lista de detalles de ingresos.
   */
  private async getDetailsOfIncome(
    query: IncomeGroupQuery,
  ): Promise<SchoolIncomeGroupRow[]> {
    const paymentStatus = parseInt(`${query.paymentStatus}`);

    const status = [paymentStatus];

    if (paymentStatus === PaymentStatus.PaiOut) {
      status.push(PaymentStatus.Abonar);
      status.push(PaymentStatus.Debit);
    }

    const startDate = startOfDay(`${query.startDate}T12:00:00`).toISOString();
    
    const endDate = endOfDay(`${query.endDate}T12:00:00`).toISOString();

    const rows: SchoolIncomeGroupRow[] = await this.connection.query(
      SchoolIncomeGroupQuery.replace('@params', status.map(() => '?').join(',')),
      [startDate, endDate, ...status],
    );

    return rows.map((row) => ({
      ...row,
      cobrado: parseFloat(`${row.cobrado}`),
      precio: parseFloat(`${row.precio}`),
      id_concepto: parseInt(`${row.id_concepto}`),
      id_pago: parseInt(`${row.id_pago}`),
      id_venta: parseInt(`${row.id_venta}`),
      id_nivel: parseInt(`${row.id_nivel}`),
      id_grado: parseInt(`${row.id_grado}`),
      id_grupo: parseInt(`${row.id_grupo}`),
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
    concepts: SchoolIncomeGroupRow[],
    charges: SchoolChargeDetailsRow[],
  ): SchoolIncomeDetailsGroupRow[] {
    const rows: SchoolIncomeDetailsGroupRow[] = [];

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
            (detail): Concept<SchoolIncomeGroupRow> => {
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

        const concepts: SchoolIncomeDetailsGroupRow[] = detailsWithPaymentApplied.concepts.map(
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
  ): Promise<SchoolChargeDetailsRow[]> {
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
      FROM school_charges_details_extra_charges c
  
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
