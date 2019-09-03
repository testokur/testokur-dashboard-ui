import * as _ from 'lodash';
import dateformat from 'dateformat';

const defaultFormat =  'dd.mm.yyyy HH:MM';

export default (date: Date | undefined ,undefinedString:string ='-' ) => {
  return _.isUndefined(date) ? undefinedString : dateformat(date, defaultFormat);
};
