import { IsOptional, IsNumber,IsNotEmpty, IsArray } from "class-validator";

export class IQueryRoutesFatherDto {

    @IsOptional()
    @IsNumber()
    limit: number;

    @IsOptional()
    @IsNumber()
    offset: number;
}

export class IQueryRoutesChildDto extends IQueryRoutesFatherDto{

    @IsNotEmpty()
    @IsArray()
    ids: number[];
}