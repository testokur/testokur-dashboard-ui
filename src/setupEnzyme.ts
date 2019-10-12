import { configure } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';

configure({ adapter: new enzymeAdapterReact16() });

window._env_ = {
  authority: 'http://localhost:9078',
  reduxLoggerActive: false,
  webapiUrl: 'http://localhost:9079',
  notificationApiUrl: 'http://localhost:9079',
  identityApiUrl: 'http://localhost:9078',
  sentryKey: '',
};
