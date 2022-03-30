import { IsNotEmpty, IsNumber, IsISO8601, IsEnum, IsString } from 'class-validator';

export enum PeriodicityEnum {
    Diario = '01',
    Semanal = '02',
    Quincenal = '03',
    Mensual = '04',
    Bimestral = '05',
}

export enum MonthEnum {
    Enero = '01',
    Febrero = '02',
    Marzo = '03',
    Abril = '04',
    Mayo = '05',
    Junio = '06',
    Julio = '07',
    Agosto = '08',
    Septiembre = '09',
    Octubre = '10',
    Noviembre = '11',
    Diciembre = '12',
    Enero_Febrero = '13',
    Marzo_Abril = '14',
    Mayo_Junio = '15',
    Julio_Agosto = '16',
    Septiembre_Octubre = '17',
    Noviembre_Diciembre = '18',
}

export class NotInvoicedDto {
    @IsNotEmpty()
    @IsISO8601()
    startDate: Date;

    @IsNotEmpty()
    @IsISO8601()
    endDate: Date;

    @IsNotEmpty()
    @IsNumber()
    branchOfficeId: number;

    @IsNotEmpty()
    @IsEnum(PeriodicityEnum)
    periodicity: PeriodicityEnum;

    @IsNotEmpty()
    @IsEnum(MonthEnum)
    month: MonthEnum;

    @IsNotEmpty()
    @IsString()
    year: string;
}


