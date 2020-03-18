module.exports = (req, res) => {
  setTimeout(() => {
    res.json([
      {
        amount: 100,
        logType: 0,
        dateTimeUtc: '2019-10-21 15:11:41.498Z',
      },
      {
        amount: 22000,
        logType: 1,
        dateTimeUtc: '2019-12-01 09:01:13.498Z',
      },
      {
        amount: 150,
        logType: 2,
        dateTimeUtc: '2020-01-05 09:01:13.498Z',
      },
      {
        amount: 354,
        logType: 3,
        dateTimeUtc: '2020-02-18 11:28:58.498Z',
      },
      {
        amount: 1000,
        logType: 4,
        dateTimeUtc: '2020-03-01 21:45:39.111Z',
      },
    ]);
  }, 4000);
};
