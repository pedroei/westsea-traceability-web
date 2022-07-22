import { Activity } from "./activity";

export interface Produto {
  docType:string;
  referenceNumber:string;
  isSerialNumber:boolean;
  designation: string;
  productType:string;
  initialQuantity:number;
  availableQuantity:number;
  usedQuantityAsInput:number;
  documentKeys:string[];
  activity:Activity;
  ID: string;
}
