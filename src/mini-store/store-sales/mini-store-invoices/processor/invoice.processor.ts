export class InvoiceProcessor {

  private checkStatusInvoice(id: number) {
    let status = '';
    switch (id) {
      case 1:
        status = 'Activo'; // Facturado
        break;
      case 2:
        status = 'Cancelado';
        break;
      case 3:
        status = 'En Proceso de Cancelacion';
        break;
      case 4:
        status = 'No Cancelable';
        break;
      default:
        status = 'No Facturado';
    }
    return status;
  }
}
