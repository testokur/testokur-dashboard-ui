import fecha from 'fecha';
import * as _ from 'lodash';

const defaultFormat = 'DD.MM.YYYY HH:mm';

export default (input: string) => {
  const parsedDate = fecha.parse(input, defaultFormat);

  if (_.isNil(parsedDate)) {
    throw Error();
  }

  return parsedDate;
};
