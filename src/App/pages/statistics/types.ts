export interface IdentityStats {
  expiredUsersToday: string;
  totalIndividualLoginCountInDay: number;
  totalUserCount: number;
  totalActiveUserCount: number;
  newUserActivatedCountToday: number;
  subscriptionExtendedCountToday: number;
}

export interface WebApiStats {
  totalStudentCount: number;
  todayStudentCount: number;
  todayScannedStudentFormCount: number;
  totalScannedStudentFormCount: number;
  totalESchoolStudentCount: number;
  totalBulkStudentCount: number;
  totalSingleEntryStudentCount: number;
  totalScannedStudentFormCountByCamera: number;
  totalScannedStudentFormCountByFile: number;
  totalExamCount: number;
  todayESchoolStudentCount: number;
  todayBulkStudentCount: number;
  todaySingleEntryStudentCount: number;
  todayScannedStudentFormCountByCamera: number;
  todayScannedStudentFormCountByFile: number;
  todayExamCount: number;
}

export interface ReportStats {
  totalCount: number;
  todayCount: number;
}

export interface NotificationStats {
  totalSuccessfulSmsCountInDay: number;
  totalSmsCredit: number;
  totalUserSmsCountInDay: number;
  totalSystemSmsCountInDay: number;
  totalFailedSmsCountInDay: number;
  longestSmsDuration: number;
  averageSmsDuration: number;
  topSmsSenderEmailAddressInDay: number;
  topSmsSenderCreditInDay: number;
  totalSmsCountAll: number;
  totalSmsCreditsAll: number;
}
