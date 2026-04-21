import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TotalDto, MethodPaymentDto } from './sale-payment.dto';

export class ChargeDetailExtraChargeDto {
  @IsNumber()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  applicationType: number;

  @IsOptional()
  operationType: number;

  @IsOptional()
  typeExtraCharge: number;

  @IsOptional()
  systemExtraCharges: { id: number };
}

export class SchoolPlanPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class ChargeDetailDto {
  @IsString()
  codeConcept: string;

  @IsOptional()
  @IsString()
  codeUnit: string;

  @IsOptional()
  @IsString()
  unidad: string;

  @IsString()
  concept: string;

  @IsNumber()
  quantity: number;

  @IsString()
  price: string;

  @ValidateNested()
  @Type(() => SchoolPlanPaymentDto)
  schoolPlanPayment: SchoolPlanPaymentDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChargeDetailExtraChargeDto)
  extraCharges?: ChargeDetailExtraChargeDto[];
}

export class CreateSchoolSaleDto {
  @IsOptional()
  @IsString()
  observations: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  change: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  campusId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  branchOfficeSetId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  cycleId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  cashierId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @ValidateNested()
  @Type(() => TotalDto)
  totals: TotalDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChargeDetailDto)
  chargesDetails: ChargeDetailDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MethodPaymentDto)
  methodsPayments: MethodPaymentDto[];
}
