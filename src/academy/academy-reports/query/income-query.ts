export const incomeQuery = `
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
    mp.quantity                                            AS cobrado,
    fp.id                                                  AS id_metodo_pago,
    fp.nombre                                              AS metodo_pago

FROM ac_charge_payments p

         INNER JOIN ac_cobros v ON v.id = p.academyChargeId
         INNER JOIN alumnos a ON a.id = v.id_alumno
         INNER JOIN usuarios u ON u.id = v.id_agente
         INNER JOIN ac_charges_methods_payments mp ON p.id = mp.academyChargePaymentId
         INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE v.id_estado_pago IN (1, 2, 5)
  AND p.paymentStatusId IN (1, 2, 5)
  AND p.createdAt BETWEEN ? AND ?
;
`;

export const incomeWithPaymentMethodQuery = `
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
    mp.quantity                                            AS cobrado,
    fp.id                                                  AS id_metodo_pago,
    fp.nombre                                              AS metodo_pago

FROM ac_charge_payments p

    INNER JOIN ac_cobros v ON v.id = p.academyChargeId
    INNER JOIN alumnos a ON a.id = v.id_alumno
    INNER JOIN usuarios u ON u.id = v.id_agente
    INNER JOIN ac_charges_methods_payments mp ON p.id = mp.academyChargePaymentId
    INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE v.id_estado_pago IN (1, 2, 5)
  AND p.paymentStatusId IN (1, 2, 5)
  AND p.createdAt BETWEEN ? AND ?
  AND fp.id = ?;`;

export const invoiceQuery = `
SELECT 
  f.id                     AS id_factura,
  f.uuid                   AS uuid_factura,
  f.folio                  AS folio_factura,
  f.status                 AS estado_factura,
  f.isGlobal               AS global_factura,
  f.createdAt              AS fecha_factura,
  f.academyChargePaymentId AS id_pago
FROM ac_facturas f

WHERE f.academyChargePaymentId IN (@paymentIds)
`;
