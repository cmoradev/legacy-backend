export interface SaleReport {
    products: ProductsSales[];
    category: CategorySale[];
    cashier: CashierMethods[];
    file: string;
}

export interface CashierMethods {
    total: number;
    id: number;
    name: string;
    methods: Methods[];
}

interface Methods {
    id: number;
    name: string;
    quantity: number;
}

export interface ProductsSales {
    name: string;
    quantity: string;
    unitMeasurement: string;
    total: string;
}

export interface CategorySale {
    name: string;
    unit: UnitMeasure[];
    total: string;
}

export interface UnitMeasure {
    id: string;
    name: string;
    unit: string;
    quantity: string;
    total: string;
}
