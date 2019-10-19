module.exports = (req, res) => {
  setTimeout(() => {
    res.json({
      expiredUsersToday: 'user1@yahoo.com;user2@yahoo.com',
      totalIndividualLoginCountInDay: 201,
      totalUserCount: 1500,
      totalActiveUserCount: 900,
      newUserActivatedCountToday: 10,
      subscriptionExtendedCountToday: 19,
    });
  }, 200);
};
