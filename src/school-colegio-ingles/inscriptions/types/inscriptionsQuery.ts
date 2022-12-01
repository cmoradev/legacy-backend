import { PaymentStatus } from "../../../common/enums/PaymentStatus";

export interface QueryReportInscriptions {
    levelId?: number,
    gradeId?: number[],
    groupId?: number[],
    isExported?: boolean

}

export interface ReportInscriptionsRow {
    inscriptionId: number,
    inscriptionStatus: PaymentStatus,
    studentId: number,
    studentRegistration: string,
    studentName: string,
    levelId: number,
    levelName: string,
    gradeId: number,
    gradeName: string,
    groupId: number,
    groupName: string,
    cycleId: number,
    cycleName: string,
    cycleIsActive: boolean,
    campusId: number,
    campusName: string,
    agentCreatorId: number,
    AgentCreatorName: string
}