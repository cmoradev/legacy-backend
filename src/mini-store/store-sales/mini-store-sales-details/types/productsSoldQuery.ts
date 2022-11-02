export interface QueryReportProductsSold {
  start_date?: Date,
  isExported?: boolean
}

export interface ReportProductsSoldRow {
  salesDetailsId: number,
  vd_start_date: Date,
  vd_measurement_unit: string,
  vd_quantity: number,
  productsId: number,
  product_name: string,
  product_price: number,
  product_price_IVA: number,
  product_IVA: boolean,
  classificationsId: number,
  classifications_name: string
}
