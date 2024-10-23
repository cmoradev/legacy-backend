export const SchoolDetailInvoiceQuery = `
SELECT f.id                     AS id_factura,
       f.uuid                   AS uuid_factura,
       f.folio                  AS folio_factura,
       f.businessName           AS razon_social_cliente,
       f.rfc                    AS rfc_cliente,
       f.total                  AS total_factura,
       f.isGlobal               AS global_factura,
       f.createdAt              AS fecha_factura,
       f.schoolChargePaymentId  AS id_pago

FROM school_charges_invoice f

WHERE f.status = ? AND f.createdAt BETWEEN ? AND ?;`;

export const SchoolDetailsInvoiceQuery = `
SELECT
    v.id                                                   AS id_venta,
    v.folio                                                AS folio_venta,
    v.createdAt                                            AS fecha_venta,
    p.id                                                   AS id_pago,
    p.folio                                                AS folio_pago,
    p.createdAt                                            AS fecha_pago,
    p.globalUuid                                           AS uuid_factura,
    mp.quantity                                            AS cobrado,
    fp.id                                                  AS id_metodo_pago,
    fp.nombre                                              AS metodo_pago,
    mp.codePaymentMethod                                   AS codigo_metodo_pago

FROM school_charge_payments p

         INNER JOIN school_charges v ON v.id = p.schoolChargeId
         INNER JOIN school_charges_methods_payments mp ON p.id = mp.schoolChargePaymentId
         INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE p.id IN (@paymentIDs) OR p.globalUuid IN (@UUIDs);
`;
