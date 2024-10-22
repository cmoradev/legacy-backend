import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class SchoolIncomeGroupQuery {
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  paymentStatus: number;
}
