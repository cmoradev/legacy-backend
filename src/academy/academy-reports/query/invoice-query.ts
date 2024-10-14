export const detailInvoiceQuery = `
SELECT f.id                     AS id_factura,
       f.uuid                   AS uuid_factura,
       f.folio                  AS folio_factura,
       f.razon_social           AS razon_social_cliente,
       f.rfc                    AS rfc_cliente,
       f.total                  AS total_factura,
       f.isGlobal               AS global_factura,
       f.academyChargePaymentId AS id_pago

FROM ac_facturas f

WHERE f.status = ? AND f.createdAt BETWEEN ? AND ?;`;

export const detailsInvoiceQuery = `
SELECT
    v.id                                                   AS id_venta,
    v.folio                                                AS folio_venta,
    v.createdAt                                            AS fecha_venta,
    p.id                                                   AS id_pago,
    p.folio                                                AS folio_pago,
    p.createdAt                                            AS fecha_pago,
    p.totalWithCharges                                     AS total_cobrado,
    p.globalUuid                                           AS uuid_factura,
    mp.quantity                                            AS cobrado,
    fp.id                                                  AS id_metodo_pago,
    fp.nombre                                              AS metodo_pago

FROM ac_charge_payments p

         INNER JOIN ac_cobros v ON v.id = p.academyChargeId
         INNER JOIN ac_charges_methods_payments mp ON p.id = mp.academyChargePaymentId
         INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE p.id IN (0) OR p.globalUuid IN ('');
`;
