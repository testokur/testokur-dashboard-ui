module.exports = (req, res) => {
  setTimeout(() => {
    res.json([
      {
        sentOnUtc: '2019-06-27T10:37:42.176139',
        subject: 'Welcome to the Club',
        body: '<html><head></head><body><h1>Welcome</h1><p>to the Club</p></body></html>',
        receiver: 'nazmialtun@windowslive.com',
      },
    ]);
  }, 2000);
};
