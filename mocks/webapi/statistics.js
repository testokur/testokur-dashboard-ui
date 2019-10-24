module.exports = (req, res) => {
  setTimeout(() => {
    res.json({
      totalESchoolStudentCount: 534534,
      totalBulkStudentCount: 41234,
      totalSingleEntryStudentCount: 53425,
      totalScannedStudentFormCountByCamera: 123,
      totalScannedStudentFormCountByFile: 523525,
      totalExamCount: 13,
      todayESchoolStudentCount: 543,
      todayBulkStudentCount: 634,
      todaySingleEntryStudentCount: 765,
      todayScannedStudentFormCountByCamera: 543534,
      todayScannedStudentFormCountByFile: 123,
      todayExamCount: 4324,
      totalSuccessfulSmsCountInDay: 54353,
      totalSmsCredit: 1431,
      totalUserSmsCountInDay: 132,
      totalSystemSmsCountInDay: 543,
      totalFailedSmsCountInDay: 64,
      longestSmsDuration: 42342,
      averageSmsDuration: 423,
      topSmsSenderEmailAddressInDay: 432,
      topSmsSenderCreditInDay: 543,
      topSmsSenderEmailInDay: 'youknowho@hotmail.com',
      totalSmsCountAll: 6456456,
      totalSmsCreditsAll: 43242423,
    });
  }, 200);
};
