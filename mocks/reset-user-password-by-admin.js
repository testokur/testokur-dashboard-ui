module.exports = (req, res) => {
  setTimeout(() => {
    res.status(204).end();
  }, 2000);
};
