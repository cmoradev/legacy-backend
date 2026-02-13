export const MiniStoreIncomeQuery = `
SELECT 
    v.id                                                   AS id_venta,
    v.folio                                                AS folio_venta,
    v.createdAt                                            AS fecha_venta,
    a.id                                                   AS id_alumno,
    a.matricula                                            AS matricula_alumno,
    CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)  AS nombre_alumno,
    u.id                                                   AS id_agente,
    CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno) AS nombre_agente,
    p.id                                                   AS id_pago,
    p.folio                                                AS folio_pago,
    p.createdAt                                            AS fecha_pago,
    p.totalWithCharges                                     AS total_cobrado,
    p.globalUuid                                           AS uuid_factura,
    mp.cantidad                                            AS cobrado,
    fp.id                                                  AS id_metodo_pago,
    fp.nombre                                              AS metodo_pago

FROM tie_venta_pagos p

         INNER JOIN tie_ventas v ON v.id = p.saleId
         INNER JOIN alumnos a ON a.id = v.id_alumno
         INNER JOIN usuarios u ON u.id = v.id_agente
         INNER JOIN tie_venta_forma_pago mp ON p.id = mp.salePaymentId
         INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE v.id_estado_pago IN (1, 2, 5)
  AND p.systemPaymentStatusId IN (1, 2, 5)
  AND p.createdAt BETWEEN ? AND ?
;
`;

export const MiniStoreIncomeWithPaymentMethodQuery = `
SELECT 
    v.id                                                   AS id_venta,
    v.folio                                                AS folio_venta,
    v.createdAt                                            AS fecha_venta,
    a.id                                                   AS id_alumno,
    a.matricula                                            AS matricula_alumno,
    CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)  AS nombre_alumno,
    u.id                                                   AS id_agente,
    CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno) AS nombre_agente,
    p.id                                                   AS id_pago,
    p.folio                                                AS folio_pago,
    p.createdAt                                            AS fecha_pago,
    p.totalWithCharges                                     AS total_cobrado,
    p.globalUuid                                           AS uuid_factura,
    mp.cantidad                                            AS cobrado,
    fp.id                                                  AS id_metodo_pago,
    fp.nombre                                              AS metodo_pago

FROM tie_venta_pagos p

    INNER JOIN tie_ventas v ON v.id = p.saleId
    INNER JOIN alumnos a ON a.id = v.id_alumno
    INNER JOIN usuarios u ON u.id = v.id_agente
    INNER JOIN tie_venta_forma_pago mp ON p.id = mp.salePaymentId
    INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE v.id_estado_pago IN (1, 2, 5)
  AND p.systemPaymentStatusId IN (1, 2, 5)
  AND p.createdAt BETWEEN ? AND ?
  AND fp.id = ?;`;

export const MiniStoreInvoiceQuery = `
SELECT 
  f.id                     AS id_factura,
  f.uuid                   AS uuid_factura,
  f.folio                  AS folio_factura,
  f.status                 AS estado_factura,
  f.isGlobal               AS global_factura,
  f.createdAt              AS fecha_factura,
  f.miniStoreSalePaymentId AS id_pago
FROM tie_facturas f

WHERE f.miniStoreSalePaymentId IN (@paymentIds)
`;
