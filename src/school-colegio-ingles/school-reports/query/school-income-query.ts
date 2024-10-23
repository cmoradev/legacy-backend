export const SchoolIncomeQuery = `
SELECT 
    v.id                                                   AS id_venta,
    v.folio                                                AS folio_venta,
    v.createdAt                                            AS fecha_venta,
    a.id                                                   AS id_alumno,
    a.matricula                                            AS matricula_alumno,
    CONCAT(a.nombre, ' ', a.ap_paterno, '', a.ap_materno)  AS nombre_alumno,
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

FROM school_charge_payments p

         INNER JOIN school_charges v ON v.id = p.schoolChargeId
         INNER JOIN alumnos a ON a.id = v.schoolStudentId
         INNER JOIN usuarios u ON u.id = v.cashierId
         INNER JOIN school_charges_methods_payments mp ON p.id = mp.schoolChargePaymentId
         INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE v.status IN (1, 2, 5)
  AND p.paymentStatusId IN (1, 2, 5)
  AND p.createdAt BETWEEN ? AND ?
;
`;

export const SchoolIncomeWithPaymentMethodQuery = `
SELECT 
    v.id                                                   AS id_venta,
    v.folio                                                AS folio_venta,
    v.createdAt                                            AS fecha_venta,
    a.id                                                   AS id_alumno,
    a.matricula                                            AS matricula_alumno,
    CONCAT(a.nombre, ' ', a.ap_paterno, '', a.ap_materno)  AS nombre_alumno,
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

FROM school_charge_payments p

    INNER JOIN school_charges v ON v.id = p.schoolChargeId
    INNER JOIN alumnos a ON a.id = v.schoolStudentId
    INNER JOIN usuarios u ON u.id = v.cashierId
    INNER JOIN school_charges_methods_payments mp ON p.id = mp.schoolChargePaymentId
    INNER JOIN facturacion_formas_pago fp ON fp.id = mp.invoiceMethodPaymentId

WHERE v.status IN (1, 2, 5)
  AND p.paymentStatusId IN (1, 2, 5)
  AND p.createdAt BETWEEN ? AND ?
  AND fp.id = ?;`;


export const SchoolInvoiceQuery = `
SELECT 
  f.id                     AS id_factura,
  f.uuid                   AS uuid_factura,
  f.folio                  AS folio_factura,
  f.status                 AS estado_factura,
  f.isGlobal               AS global_factura,
  f.createdAt              AS fecha_factura,
  f.schoolChargePaymentId AS id_pago
FROM school_charges_invoice f

WHERE f.schoolChargePaymentId IN (@paymentIds)
`;