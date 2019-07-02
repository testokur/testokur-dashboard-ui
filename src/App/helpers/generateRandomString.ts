import * as _ from 'lodash';

export default (size: number) => {
  return _.times(size, () => _.random(35).toString(36)).join('');
};
