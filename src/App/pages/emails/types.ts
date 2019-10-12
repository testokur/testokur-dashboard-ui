import { Guid } from 'guid-typescript';

export interface Email {
  id: Guid;
  subject: string;
  body: string;
  sentOnUtc: string;
  receiver: string;
}
