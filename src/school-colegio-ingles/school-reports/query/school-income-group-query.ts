export const SchoolIncomeGroupQuery = `
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
    lv.id				AS id_nivel,
    lv.nivel			AS nivel,
    grd.id				AS id_grado,
    grd.grado			AS grado,
    cc.id				AS id_grupo,
    cc.grupo			as grupo,
    d.id                AS id_concepto,
    d.concept          AS concepto,
    d.price            AS precio

FROM school_charges_details d

    INNER JOIN school_payment c ON c.id = d.schoolPlanPaymentId
    INNER JOIN inscripciones ins ON ins.id = c.inscriptionId
    INNER JOIN classroom cc ON cc.id = ins.inscripClassroomId
    INNER JOIN grados grd ON grd.id = cc.gradeId
    INNER JOIN niveles lv ON lv.id = cc.levelId
    INNER JOIN school_charges v ON v.id = d.schoolChargeId
    INNER JOIN school_charge_payments p ON p.schoolChargeId = v.id
    INNER JOIN alumnos s ON v.schoolStudentId = s.id

WHERE (p.createdAt BETWEEN ? AND ?) AND v.status IN (@params) AND p.paymentStatusId IN (1, 2, 5);`;
