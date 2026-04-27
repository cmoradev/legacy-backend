import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignMiniStorePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  miniStoreSaleId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  miniStorePaymentId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  miniStorePaymentTotal: number;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  schoolPaymentIds: number[];
}
