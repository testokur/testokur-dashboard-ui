export interface UserActivity {
  id: number;
  userId: string;
  type: string;
  dateTimeUtc: Date;
  createdBy: string;
}
