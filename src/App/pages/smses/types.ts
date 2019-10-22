import { Guid } from 'guid-typescript';

export interface Sms {
  id: Guid;
  subject: string;
  body: string;
  phone: string;
  userId: number;
  userEmail: string;
  serviceRequest: string;
  serviceResponse: string;
  userFriendlyErrorMessage: string;
  error: string;
  credit: number;
  status: number;
  createdOnDateTimeUtc: string;
  requestDateTimeUtc: string;
  responseDateTimeUtc: string;
}
