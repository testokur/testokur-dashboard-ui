import * as _ from 'lodash';
import fecha from 'fecha';

const defaultFormat = 'DD.MM.YYYY HH:mm';

export default (date: Date | undefined, undefinedString: string = '-') => {
  return _.isUndefined(date) ? undefinedString : fecha.format(date, defaultFormat);
};
