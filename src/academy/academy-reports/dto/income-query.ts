import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class IncomeQuery {
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  method?: number;
}
