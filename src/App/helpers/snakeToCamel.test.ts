import snakeToCamel from './snakeToCamel';

test('should convert snake case to camel case', () => {
  const testString = 'new-password';
  expect(snakeToCamel(testString)).toBe('newPassword');
});
