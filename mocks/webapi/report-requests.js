module.exports = (req, res) => {
  setTimeout(() => {
    res.json({
      totalCount: 43242,
      todayCount: 644,
    });
  }, 200);
};
