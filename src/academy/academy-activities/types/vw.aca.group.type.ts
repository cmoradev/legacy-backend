export type VwAcaGroupType = {
    a_id: number;
    a_name: string;
    g_id: number;
    g_name: string;
    g_schedule: string;
    p_id: number;
    p_name: string;
    c_id: number;
    c_name: string;
    students?: VwAcaGroupStudentType[];
}

export type VwAcaGroupStudentType = {
    id: number;
    matricula: string;
    name: string;
    type: string;
    level: string;
    grade: string;
    group: string;
    state: string;
    date: string;
}
