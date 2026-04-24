export type SchoolDetailsRow = {
  id_grupo: number;
  nombre_grupo: string;
  id_nivel: number;
  nivel: string;
  id_grado: number;
  grado: string;
  minimo_grupo: number;
  maximo_grupo: number;
};

export type SchoolInscriptionDetailsRow = {
  estado_inscripcion: number;
  id_grado: number;
  id_nivel: number;
  id_grupo: number;
  matricula_alumno;
  nombre_alumno;
  apellido_paterno: string;
  apellido_materno: string;
  nombre: string;
};

export type SchoolGroupRow = {
  id_grupo: number;
  nombre_grupo: string;
  minimo_grupo: number;
  maximo_grupo: number;
  id_nivel: number;
  nivel: string;
  id_grado: number;
  grado: string;
  integrantes: SchoolStudent[];
};

export type SchoolStudent = {
  matricula_alumno: string;
  nombre_alumno: string;
  estado_inscripcion: number;
  apellido_paterno: string;
  apellido_materno: string;
  nombre: string;
};
