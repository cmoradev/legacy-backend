import { TypeStudent } from '../../../school-colegio-ingles/students/interface/studentsSchool.interface';
import { formatDate } from '../../../common/date';
import { roundQuantity } from '../../../common/point-of-sale/point-of-sale';
import { AcademyInscriptionConcepts } from '../entities/academy-inscription-concepts.entity';
import { AcademyReportStructure } from '../interfaces/IQueryReport';

export class ReportProcessor {
  public strutureReport(academyPayments: AcademyInscriptionConcepts[]): AcademyReportStructure[] {
    const flatReport: AcademyReportStructure[] = [];
    for (const ac of academyPayments) {
      let payDay;
      payDay = formatDate(ac.payDate);
      flatReport.push({
        enrollment: ac.acInscription.student.matricula,
        clientName: `${ac.acInscription.student.name} ${ac.acInscription.student.lastNameFather} ${ac.acInscription.student.lastNameMother}`.toUpperCase(),
        clientType: ac.acInscription.student.typeStudent === TypeStudent.student ? 'Alumno' : 'Externo',
        academy: ac.acInsConActivity.name,
        group: ac.acInscription.academyGroup.name,
        description: ac.description,
        price: roundQuantity(ac.price),
        payDay,
        statusPayment: this.checkStatusPayment(ac.paymentStatus),
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