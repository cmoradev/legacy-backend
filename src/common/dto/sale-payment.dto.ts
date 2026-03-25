import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BankDto {
  @IsNumber()
  id: number;
}

export class TotalDto {
  @IsNumber()
  totalWithCharges: number;

  @IsNumber()
  totalWithoutCharges: number;

  @IsNumber()
  totalDiscount: number;

  @IsNumber()
  totalSurcharges: number;
}

export class InvoiceMethodPaymentDto {
  id: number;
}
export class MethodPaymentDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => BankDto)
  Bank: BankDto | null;
  codePaymentMethod: string;
  date: string;
  invoiceMethodPayment: InvoiceMethodPaymentDto;
  quantity: number;
}

export class SalePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  saleId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  cashier: number;

  @IsOptional()
  @IsString()
  observations: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  change: number;

  @ValidateNested()
  @Type(() => TotalDto)
  total: TotalDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MethodPaymentDto)
  methodsPayments: MethodPaymentDto[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  paymentOfficeId?: number;

  @IsNumber()
  @IsOptional()
  paymentOfficeSetId?: number;
}
