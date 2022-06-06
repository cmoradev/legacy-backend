import { FormaPago, FormaPagoType, XmlReceptorAttribute } from "@signati/core";
import { InformacionGlobal } from "../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface";
import { BranchOfficeSetting } from "../../system/branch-office-setting/entities/branch-office-setting.entity";
import { SystemTypeExtraChargesEnum } from "src/system/system-type-extra-charges/entities/system-type-extra-charges.entity";
import { TypeChargeApplicationEnum } from "src/system/system-extra-charges/enums/system-extra-charges.enum";

export interface Concept {
    keyProdServ: string;
    noIdentity: string;
    quantity: string;
    keyUnit: string;
    description: string;
    unitValue: string;
    amount: string;
    discount: string;
    objectImp: string;
}

export interface InvoiceDetails {
    total: number;
    subtotal: number;
    discount: number;
    taxes: number;
    details: Concept[];
}
export interface FacturaDetalles {
    total: number | string;
    subtotal: number | string;
    discount: number | string;
    surcharges: number | string;
    taxes?: number | string;
    impuestos: any
    detalles: any[];
}

export interface Environment {
    instancePath: string
    xslt: string
}

export interface CFDIWebtel extends FacturaDetalles {
    serie: string;
    folio: string;
    codigoFormaPago: FormaPago | FormaPagoType;
    emisor: BranchOfficeSetting;
    receptor: XmlReceptorAttribute;
    env: Environment;
    informacionGlobal?: InformacionGlobal;
    importeImpuesto?: number;
}
export enum InvoiceModules {
    ACADEMY = 1,
    SCHOOL = 2,
    STORE = 3,
}
export interface Payment extends MoreProperties {
    quantity: number;
    change: number;
}

interface MoreProperties {
    [key: string]: any
}

export interface ExtraCharges {
    typeExtraCharge: SystemTypeExtraChargesEnum,
    quantity: number,
    applicationType: TypeChargeApplicationEnum
}
export interface Detalles extends MoreProperties {
    id: number;
    quantity: number;
    price: number | string;
    extraCharges: ExtraCharges[]
}