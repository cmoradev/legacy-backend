import { ArrayNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ToggleSchoolPaymentActiveDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  schoolPaymentIds: number[];
}
