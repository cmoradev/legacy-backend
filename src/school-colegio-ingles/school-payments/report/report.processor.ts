import { ReportStructure } from '../interfaces/IQueryReport';
import { SchoolPayment } from '../entities/school-payment.entity';
import { formatDate } from '../../../common/date';
import { TypeStudent } from '../../students/interface/studentsSchool.interface';

export class ReportProcessor {
  public strutureReport(schoolPayments: SchoolPayment[]): ReportStructure[] {
    const flatReport: ReportStructure[] = [];
    for (const schoolPayment of schoolPayments) {
      let payDay;
      payDay = formatDate(schoolPayment.payDate);
      flatReport.push({
        enrollment: schoolPayment.inscription.inscripStudent.matricula,
        clientName: `${ schoolPayment.inscription.inscripStudent.name } ${ schoolPayment.inscription.inscripStudent.lastNameFather } ${ schoolPayment.inscription.inscripStudent.lastNameMother }`.toUpperCase(),
        clientType: schoolPayment.inscription.inscripStudent.typeStudent === TypeStudent.student ? 'Alumno' : 'Externo',
        level: schoolPayment.inscription.inscripLevel.name,
        grade: schoolPayment.inscription.inscripGrade.name,
        group: schoolPayment.inscription.inscripGroup.name,
        description: schoolPayment.description,
        price: schoolPayment.price,
        payDay,
        statusPayment: this.checkStatusPayment(schoolPayment.statusPayment),
      });
    }
    return flatReport;
  }

  /*Debit = 1, // Adeudo
  PaiOut = 2, // Pagado
  Condoned = 3, // Condonado/Perdonado
  Cancelled = 4, // Cancelado
  Abonar = 5, // Abonado
  quotation = 6, // Cotizacion*/
  public checkStatusPayment(id: number) {
    let status: string;
    switch (id) {
      case 1:
        status = 'Adeudo';
        break;
      case 2:
        status = 'Pagado';
        break;
      case 3:
        status = 'Condonado';
        break;
      case 4:
        status = 'Cancelado';
        break;
      case 5:
        status = 'Abonado';
        break;
      case 6:
        status = 'Cotizacion';
        break;
      default:
        status = 'Adeudo';
    }
    return status;
  }
}