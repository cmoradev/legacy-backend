import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GroupQuery {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  groupId: number;
}
