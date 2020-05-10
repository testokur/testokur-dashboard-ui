import { isUndefined } from 'testokur-utils';
import fecha from 'fecha';

const defaultFormat = 'DD.MM.YYYY HH:mm:ss';

export default (date: Date | undefined, undefinedString: string = '-') => {
  return isUndefined(date) ? undefinedString : fecha.format(date, defaultFormat);
};
