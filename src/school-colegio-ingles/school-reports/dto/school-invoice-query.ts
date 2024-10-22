import { IsString, IsNotEmpty } from 'class-validator';

export class SchoolInvoiceQuery {
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  invoiceStatus: string;
}
