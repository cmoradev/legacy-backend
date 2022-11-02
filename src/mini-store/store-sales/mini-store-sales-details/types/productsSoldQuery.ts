export interface QueryReportProductsSold {
  start_date?: Date;
  isExported?: boolean;
}

export interface ReportProductsSoldRow {
  salesDetailsId: number;
  start_date: Date;
  product_unity: number;
  productsId: number;
  product_name: string;
  product_price: number;
  product_price_IVA: number;
  product_IVA: boolean;
  classificationsId: number;
  classifications_name: string;
}
