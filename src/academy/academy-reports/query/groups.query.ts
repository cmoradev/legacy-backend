export const academiasQuery = `
SELECT a.id       AS id_academia,
       a.nombre   AS nombre_academia,
       a.incluida AS incluida_academia,
       a.externo  AS externo_academia,
       a.escolar  AS escolar_academia,
       g.id       AS id_grupo,
       g.nombre   AS nombre_grupo,
       g.min      AS minimo_grupo,
       g.max      AS maximo_grupo,
       g.horario  AS horario_grupo
FROM ac_academias a

         INNER JOIN ac_grupos g ON a.id = g.id_academia AND g.deletedAt IS NULL AND g.id_ciclo = ?

WHERE a.deletedAt IS NULL
  AND a.active = 1;
;`;

export const inscripcionesQuery = `
SELECT i.id_academia                                         AS id_academia,
       i.id_ac_grupo                                         AS id_grupo,
       a.matricula                                           AS matricula_alumno,
       CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno) AS nombre_alumno

FROM ac_inscripciones_alumnos i

         INNER JOIN alumnos a ON i.id_alumno = a.id AND a.deletedAt IS NULL

WHERE i.id_ciclo = ?
  AND i.active = 1
  AND i.id_ac_grupo IS NOT NULL
  AND i.id_estado_inscripcion IN (1, 2);
;`;
