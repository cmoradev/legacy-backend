import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SchoolGroupQuery {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  cycleId: number;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;
}
