import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SchoolDebitQuery {

    
    @IsString()
    @IsNotEmpty()
    startDate: string;
    
    @IsString()
    @IsNotEmpty()
    endDate: string;
 
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    paymentStatus?: number;
}
