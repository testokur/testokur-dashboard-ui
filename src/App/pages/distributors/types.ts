import { Guid } from 'guid-typescript';

export interface Distributor {
  id: Guid;
  userName: string;
  schoolName: string;
  phone: string;
  users:string[] | undefined;
}
