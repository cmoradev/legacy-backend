import { IsOptional, IsNumber,IsNotEmpty, IsArray, IsString } from "class-validator";

export class IQueryRoutesFatherDto {

    @IsOptional()
    @IsNumber()
    limit: number;

    @IsOptional()
    @IsNumber()
    offset: number;

    @IsOptional()
    @IsString()
    text: string;
}

export class IQueryRoutesChildDto extends IQueryRoutesFatherDto{

    @IsNotEmpty()
    @IsArray()
    ids: number[];
}