export const detailInvoiceQuery = `
SELECT f.id                     AS id_factura,
       f.uuid                   AS uuid_factura,
       f.folio                  AS folio_factura,
       f.razon_social           AS razon_social_factura,
       f.total                  AS total_factura,
       f.isGlobal               AS global_factura,
       f.academyChargePaymentId AS id_pago

FROM ac_facturas f

WHERE f.status = ? AND f.createdAt BETWEEN ? AND ?;`;
