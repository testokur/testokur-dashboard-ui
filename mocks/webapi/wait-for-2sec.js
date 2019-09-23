module.exports = (req, res) => {
  setTimeout(() => {
    res.status(200).end();
  }, 2000);
};
