import { QueryReportInscriptions, ReportInscriptionsRow } from "../types/inscriptionsQuery";

export const getNameList = (
    label: string,
    params: QueryReportInscriptions,
    result: ReportInscriptionsRow[]): { excel: string, title: string } => {
    let nameE = '' + label; // 'attendance_list'
    let name = '' + label;
    if (params.levelId) {
        const level = result.find((r) => r.levelId == params.levelId).levelName;
        nameE += `_${level}` // 'attendance_list' + 'primaria'
        name += ` ${level}`
    }
    if (params.gradeId) {
        const grade = result.find((r) => r.gradeId == params.gradeId).gradeName;
        nameE += `_${grade}` // 'attendance_list' + '1er grado'
        name += `- ${grade}`
    }
    return { excel: nameE, title: name };
}