export const MiniStoreDetailInvoiceQuery = `
SELECT f.id                     AS id_factura,
       f.uuid                   AS uuid_factura,
       f.folio                  AS folio_factura,
       f.razon_social           AS razon_social_cliente,
       f.rfc                    AS rfc_cliente,
       f.total                  AS total_factura,
       f.isGlobal               AS global_factura,
       f.createdAt              AS fecha_factura,
       f.miniStoreSalePaymentId AS id_pago

FROM tie_facturas f

WHERE f.status = ? AND f.createdAt BETWEEN ? AND ?;`;

export const MiniStoreDetailsInvoiceQuery = `
SELECT
    v.id                                                   AS id_venta,
    v.folio                                                AS folio_venta,
    v.createdAt                                            AS fecha_venta,
    p.id                                                   AS id_pago,
    p.folio                                                AS folio_pago,
    p.createdAt                                            AS fecha_pago,
    p.globalUuid                                           AS uuid_factura,
    mp.cantidad                                            AS cobrado,
    fp.id                                                  AS id_metodo_pago,
    fp.nombre                                              AS metodo_pago,
    mp.codigo_forma_pago                                   AS codigo_metodo_pago

FROM tie_venta_pagos p

         INNER JOIN tie_ventas v ON v.id = p.saleId
         INNER JOIN tie_venta_forma_pago mp ON p.id = mp.salePaymentId
         INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE p.id IN (@paymentIDs) OR p.globalUuid IN (@UUIDs);
`;
