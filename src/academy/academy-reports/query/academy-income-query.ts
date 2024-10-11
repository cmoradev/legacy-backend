export const academyIncomeQuery = `
SELECT 
    v.id                AS id_venta,
    v.folio             AS folio_venta,
    v.createdAt         AS fecha_venta,
    p.id                AS id_pago,
    p.folio             AS folio_pago,
    p.createdAt         AS fecha_pago,
    p.totalWithCharges  AS cobrado,
    s.id                AS id_alumno,
    s.matricula         AS matricula_alumno,
    CONCAT(s.nombre, ' ', s.ap_paterno, '', s.ap_materno) AS nombre_alumno,
    a.id                AS id_academia,
    a.nombre            AS academia,
    d.id                AS id_concepto,
    d.concepto          AS concepto,
    d.precio            AS precio

FROM ac_cobro_detalle d

    INNER JOIN ac_inscrip_conceptos c ON c.id = d.academyInscriptionConceptId
    INNER JOIN ac_academias a ON a.id = c.id_academia
    INNER JOIN ac_cobros v ON v.id = d.id_ac_cobro
    INNER JOIN ac_charge_payments p ON p.academyChargeId = v.id
    INNER JOIN alumnos s ON v.id_alumno = s.id

WHERE (p.createdAt BETWEEN ? AND ?) AND v.id_estado_pago IN (@params) AND p.paymentStatusId IN (1, 2, 5);`;
