import { number, string } from '@hapi/joi';

export interface ChangeStatusInvoiceMiniStoreInterface {
  id: number;
  status: number;
  idCancelingAgent: number;
  reasonCancellation: string;
}