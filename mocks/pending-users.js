module.exports = (req, res) => {
  setTimeout(() => {
    res.json([
      {
        userName: 'nazmialtun@windowslive.com',
        email: 'nazmialtun@windowslive.com',
      },
      {
        userName: 'user6@hotmail.com',
        email: 'user6@hotmail.com',
      },
      {
        userName: 'user2@hotmail.com',
        email: 'user2@hotmail.com',
      },
      {
        userName: 'marry@hotmail.com',
        email: 'marry@hotmail.com',
      },
      {
        userName: 'josh@hotmail.com',
        email: 'josh@hotmail.com',
      },
    ]);
  }, 200);
};
