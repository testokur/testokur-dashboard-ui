import formatDateTime from './formatDateTime';

test('when datetime is undefined then given string should return', () => {
  const output = formatDateTime(undefined, '-');
  expect(output).toBe('-');
});

test('when datetime is valid then it should be formatted in default format', () => {
  const output = formatDateTime(new Date(2018, 11, 24, 10, 33, 30, 0), '-');
  expect(output).toBe('24.12.2018 10:33');
});
