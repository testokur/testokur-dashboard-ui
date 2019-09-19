module.exports = (req, res) => {
  setTimeout(() => {
    res.json(['user1@gmail.com', 'user2@hotmail.com', 'user3@yahoo.com', 'user4@yandex.com']);
  }, 200);
};
