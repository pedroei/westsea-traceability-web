import { Produto } from "./produto";

export interface Activity{
  designation:string;
  userId:string;
  inputProductLots:Produto[];
  ID:string;
  dateTime:string;
}
