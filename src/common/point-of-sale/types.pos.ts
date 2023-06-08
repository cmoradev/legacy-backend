import { FormaPago, FormaPagoType, XmlReceptorAttribute } from "@signati/core";
import { InformacionGlobal } from "../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface";
import { BranchOfficeSetting } from "../../system/branch-office-setting/entities/branch-office-setting.entity";
import { SystemTypeExtraChargesEnum } from "../../system/system-type-extra-charges/entities/system-type-extra-charges.entity";
import { TypeChargeApplicationEnum } from "../../system/system-extra-charges/enums/system-extra-charges.enum";
import { DataInvoice } from "../calculations/TypesCalculation";

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

export interface TotalsDetails extends Partial<InvoiceDetails> {
    surcharges: number;
    detailsReceipt: any[]
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

export type RelateParams = {
    type: string;
    documents: string[]
}

export interface CFDIWebtel extends DataInvoice {
    serie: string;
    folio: string;
    codigoFormaPago: FormaPago | FormaPagoType;
    emisor: BranchOfficeSetting;
    receptor: XmlReceptorAttribute;
    env: Environment;
    informacionGlobal?: InformacionGlobal;
    importeImpuesto?: number;
    related: RelateParams[];
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
export interface Charge {
    subtotal: any;
    discount: any;
    surcharge: any;
    scholarship: any;
    proccess: {
        becas: any;
        discount: any;
        recargos: any;
        detailTotal: any;
        scholarshipsTotal: any;
        surchargesTotal: any;
        discountTotal: any;
    }
}

export interface ChargesDetails{
    amountDiscount: any;
    price: {
        priceUnit: any;
        amount: any;
    },
    data: {
        becas: any;
        discount: any;
        recargos: any;
    }
    quantity: any;
    base: any;
    iva: any;
    subtotal: any;
    total: any;
}