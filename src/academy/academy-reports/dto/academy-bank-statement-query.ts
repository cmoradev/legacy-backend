import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AcademyBankStatementQuery {

    
    @IsString()
    @IsNotEmpty()
    startDate: string;
    
    @IsString()
    @IsNotEmpty()
    endDate: string;
    
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    studentId: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    paymentStatus?: number;
}
