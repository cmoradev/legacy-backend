export interface VerificarInscriprions {
    name: string;
    data: VerInsData[];
}

interface VerInsData {
    matricula: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre: string;
}

export interface Attendance {
    onlyFile: boolean,
    branchOfficeId: number;
    cycleId: number;
    levelId: number;
    gradeId: number;
    classRoomId: number;
}