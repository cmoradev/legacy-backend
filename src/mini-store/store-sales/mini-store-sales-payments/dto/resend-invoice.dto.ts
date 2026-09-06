import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ResendInvoiceDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  branchOfficeId: number;

  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
