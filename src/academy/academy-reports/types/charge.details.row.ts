import { ChargeApplicationEnum, ChargeTypeEnum } from '@munyaal/calculations';

export type ChargeDetailsRow = {
  id: number;
  description: string;
  quantity: number;
  type: ChargeTypeEnum;
  applcation: ChargeApplicationEnum;
  operation: string;
  internalType: string;
  id_detalle: number;
  order: number;
};
