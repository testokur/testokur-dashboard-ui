module.exports = (req, res) => {
  setTimeout(() => {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    res.json([
      'user1@hotmail.com',
      'user2@hotmail.com',
      'user3@hotmail.com',
      'user4@hotmail.com',
      'user5@hotmail.com',
      'user6@hotmail.com',
    ]);
  }, 2000);
};
