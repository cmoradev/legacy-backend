import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CancellationDto {
  
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  userID: number;

  @IsString()
  @MinLength(20)
  reasonCancellation: string;

  @IsOptional()
  @IsEmail()
  adminEmail?: string;

  @IsOptional()
  @IsString()
  adminPassword?: string;

}
