module.exports = (req, res) => {
  setTimeout(() => {
    res.json({
      id: 4,
      subjectId: '793bdaa8-708c-4c45-9328-1d5b71556d65',
      smsBalance: 18,
      cityName: 'Istanbul',
      districtName: 'Bakirkoy',
      cityId: 34,
      districtId: 114,
      email: 'josh@hotmail.com',
      phone: '5449875544',
      firstName: 'Josh',
      lastName: 'Pollack',
      schoolName: 'X-Men School',
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      registrarFullName: 'Lilly Pollack',
      registrarPhone: '5449875544',
    });
  }, 200);
};
