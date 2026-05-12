export const SchoolGroupsQuery = `
SELECT c.id       AS id_grupo,
       c.grupo   AS nombre_grupo,
       c.min      AS minimo_grupo,
       c.max      AS maximo_grupo,
       lv.id				AS id_nivel,
		   lv.nivel			AS nivel,
		   grd.id				AS id_grado,
		   grd.grado			AS grado
FROM  classroom c
	      INNER JOIN grados grd ON grd.id = c.gradeId AND grd.deletedAt IS NULL
        INNER JOIN niveles lv ON lv.id = c.levelId AND lv.deletedAt IS NULL

WHERE c.deletedAt IS NULL 
  AND c.cycleId = ? ;`;

export const SchoolInscripcionesQuery = `
SELECT i.inscripClassroomId                                   AS id_grupo,
		   i.inscripGradeId	                      								AS id_grado,
       i.inscripLevelId			                       						AS id_nivel,
       a.matricula                                            AS matricula_alumno,
       CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)  AS nombre_alumno,
       a.ap_paterno                                           AS apellido_paterno,
       a.ap_materno                                           AS apellido_materno,
       a.nombre                                               AS nombre

FROM  inscripciones i

         INNER JOIN alumnos a ON i.inscripStudentId = a.id AND a.deletedAt IS NULL

WHERE i.inscripCycleId = ?
  AND i.inscripClassroomId IS NOT NULL
  AND i.id_status IN ('1','2', '3');
;`;
