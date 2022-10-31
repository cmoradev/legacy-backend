
export interface QueryReportProducts {
    listId?: number,
    classificationId?: number,
    isExported?: boolean
}

export interface ReportProductsRow {   
    productsId: number,
    product_name: string,
    product_code: string,
    storage_quantity: number,
    minimum_storage: number,
    maximum_storage: number,
    classificationsId: number,
    classification_name: string,    
    listId: number,
    list_name: string
}