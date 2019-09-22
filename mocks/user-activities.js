module.exports = (req, res) => {
  setTimeout(() => {
    res.json([
      {
        id: 1,
        userId: 'some-id',
        type: 'UserCreated',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 2,
        userId: 'some-id',
        type: 'UserActivated',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 3,
        userId: 'some-id',
        type: 'SuccessfulLogin',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 765,
        userId: 'some-id',
        type: 'InvalidUsernameOrPassword',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 4543,
        userId: 'some-id',
        type: 'PasswordChanged',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 86786,
        userId: 'some-id',
        type: 'InvalidLoginDeviceId',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 13213,
        userId: 'some-id',
        type: 'PasswordReset',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 534534,
        userId: 'some-id',
        type: 'UserDeActivated',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 543543,
        userId: 'some-id',
        type: 'PasswordResetByAdmin',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 54356,
        userId: 'some-id',
        type: 'UserSubscriptionExtended',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
      {
        id: 1432,
        userId: 'some-id',
        type: 'LoginByMasterPassword',
        createdBy: 'nazmi@testokur.com',
        dateTimeUtc: '2019-06-26T10:37:42.440445',
      },
    ]);
  }, 200);
};
