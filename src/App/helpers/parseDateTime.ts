import fecha from 'fecha';
import { isNil } from 'testokur-utils';

const defaultFormat = 'DD.MM.YYYY HH:mm:ss';

export default (input: string) => {
  const parsedDate = fecha.parse(input, defaultFormat);

  if (isNil(parsedDate)) {
    throw Error();
  }

  return parsedDate;
};
