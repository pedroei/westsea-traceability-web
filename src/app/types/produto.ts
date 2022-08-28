import { Activity } from './activity';
import { DocumentKey } from './documentKey';

export interface Produto {
  docType: string;
  referenceNumber: string;
  isSerialNumber: boolean;
  designation: string;
  productType: string;
  initialQuantity: number;
  availableQuantity: number;
  usedQuantityAsInput: number;
  documentKeys: DocumentKey[];
  activity: Activity;
  ID: string;
}
