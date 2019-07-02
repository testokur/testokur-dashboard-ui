import generateRandomString from './generateRandomString';

test('should generate a random string with given size', () => {
  const size = 50;
  const generatedString = generateRandomString(size);
  expect(generatedString).toHaveLength(size);
});
