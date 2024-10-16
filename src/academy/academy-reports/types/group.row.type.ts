export type AcademyDetailsRow = {
  id_academia: number;
  nombre_academia: string;
  incluida_academia: boolean;
  externo_academia: boolean;
  escolar_academia: boolean;
  id_grupo: number;
  nombre_grupo: string;
  minimo_grupo: number;
  maximo_grupo: number;
  horario_grupo: string;
};

export type InscriptionDetailsRow = {
  estado_inscripcion: number;
  id_academia: number;
  id_grupo: number;
  matricula_alumno;
  nombre_alumno;
};

export type GroupRow = {
  id_grupo: number;
  nombre_grupo: string;
  minimo_grupo: number;
  maximo_grupo: number;
  id_academia: number;
  nombre_academia: string;
  incluida_academia: boolean;
  externo_academia: boolean;
  escolar_academia: boolean;
  integrantes: Student[];
};

export type Student = {
  matricula_alumno: string;
  nombre_alumno: string;
  estado_inscripcion: number;
};
