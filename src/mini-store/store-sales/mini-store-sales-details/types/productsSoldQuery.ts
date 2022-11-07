import { TypeInformativeReport } from '../../../../common/enums/typeInformativeReport.enum';
import { IQueryReportSaleToday } from '../../mini-store-sales/types/IReport';


export interface QueryReportProductsSold extends IQueryReportSaleToday {
  type?: TypeInformativeReport,
  cashier_id?: number[]
}

export interface ReportProductsSoldRow {
  salesDetailsId: number,
  vd_createdAt: Date,
  vd_measurement_unit: string,
  vd_quantity: number,
  productsId: number,
  product_name: string,
  product_price: number,
  product_price_IVA: number,
  product_IVA: boolean,
  planteles_id: number,
  planteles_name: string,
  ciclo_id: number,
  ciclo_name: string,
  classificationsId: number,
  classifications_name: string,
  cashier_id: number,
  cashier_fullname: string,
  sellStatus: number
}
