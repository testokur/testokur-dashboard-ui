import parseDateTime from './parseDateTime';
import { formatDateTime } from '.';

test('when input is valid in default format then datetime should be parsed', () => {
  const initialDateString = '03.09.2019 19:12:30';
  const parsedDate = parseDateTime(initialDateString);
  expect(formatDateTime(parsedDate as Date)).toBe(initialDateString);
});

test('when input is invalid should throw ', () => {
  const invalidDatetimeString = '03.09.201';
  expect(() => parseDateTime(invalidDatetimeString)).toThrow();
});
