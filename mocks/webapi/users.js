module.exports = (req, res) => {
  setTimeout(() => {
    res.json([
      {
        id: 1,
        subjectId: '793bdaa8-708c-4c45-9328-1d5b71556d62',
        smsBalance: 1966,
        cityName: 'Denizli',
        districtName: 'Merkez',
        cityId: 20,
        districtId: 278,
        email: 'nazmialtun88@gmail.com',
        phone: '5544205163',
        firstName: 'Nazmi',
        lastName: 'Altun',
        schoolName: 'X-Men School',
        notes:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        registrarFullName: 'Cengiz Altun',
        registrarPhone: '5544205163',
      },
      {
        id: 2,
        subjectId: '793bdaa8-708c-4c45-9328-1d5b71556d63',
        smsBalance: 154,
        cityName: 'Izmir',
        districtName: 'Bornova',
        cityId: 35,
        districtId: 172,
        email: 'nazmialtun@windowslive.com',
        phone: '5554442233',
        firstName: 'John',
        lastName: 'Brown',
        schoolName: 'X-Men School',
        notes:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        registrarFullName: 'Jesse Brown',
        registrarPhone: '5554442233',
      },
      {
        id: 3,
        subjectId: '793bdaa8-708c-4c45-9328-1d5b71556d64',
        smsBalance: 578,
        cityName: 'Istanbul',
        districtName: 'Pendik',
        cityId: 34,
        districtId: 724,
        email: 'marry@hotmail.com',
        phone: '5523336699',
        firstName: 'Marry',
        lastName: 'Brown',
        schoolName: 'X-Men School',
        notes:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        registrarFullName: 'Walter Brown',
        registrarPhone: '5523336699',
      },
      {
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
      },
    ]);
  }, 4000);
};
