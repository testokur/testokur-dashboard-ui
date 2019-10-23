import formatDateTime from './formatDateTime';

test('when datetime is undefined then given string should return', () => {
  const formatedDateTime = formatDateTime(undefined, '-');
  expect(formatedDateTime).toBe('-');
});

test('when datetime is valid then it should be formatted in default format', () => {
  const formatedDateTime = formatDateTime(new Date(2018, 11, 24, 10, 33, 30, 0), '-');
  expect(formatedDateTime).toBe('24.12.2018 10:33:30');
});
