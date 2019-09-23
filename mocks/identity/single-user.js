module.exports = (req, res) => {
  setTimeout(() => {
    res.json({
      loginDevices: null,
      maxAllowedDeviceCount: 1,
      maxAllowedStudentCount: 500,
      canScan: true,
      licenseTypeId: 1,
      active: true,
      createdDateTimeUtc: '2019-06-27T10:37:42.176139',
      startDateTimeUtc: null,
      expiryDateUtc: '2021-06-26T10:37:42.440445',
      activationTimeUtc: '2019-06-27T10:37:42.416431',
      id: '793bdaa8-708c-4c45-9328-1d5b71556d65',
      userName: 'josh@hotmail.com',
      email: 'josh@hotmail.com',
      emailConfirmed: true,
      phoneNumber: null,
      phoneNumberConfirmed: false,
      twoFactorEnabled: false,
      lockoutEnd: null,
      lockoutEnabled: true,
      accessFailedCount: 0,
    });
  }, 200);
};
