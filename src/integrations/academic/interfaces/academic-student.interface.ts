export interface AcademicStudent {
    id: string;
    matricula: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    curp: string;
    numero_periodo: number;
    periodo: string; // 'Sep 16-Dic 16'
    plantel: string;
    oferta: string;
    estatus_inscripcion: string;
    tipo_horario: string;
}
