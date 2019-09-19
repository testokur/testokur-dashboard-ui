module.exports = (req, res) => {
  setTimeout(() => {
    res.json([
      'user1@gmail.com',
      'user2@hotmail.com',
      'user3@yahoo.com',
      'user5@yandex.com',
      'user6@yandex.com',
      'user7@yandex.com',
      'user8@yandex.com',
      'user9@yandex.com',
      'user11@yandex.com',
      'user19@yandex.com',
    ]);
  }, 200);
};
