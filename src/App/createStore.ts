import { History } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducer';
import { rootSaga } from './sagas';

export default (history: History) => {
  const allReducers = createRootReducer(history);
  const sagaMiddleware = createSagaMiddleware();
  let middlewares;

  if (window._env_.reduxLoggerActive) {
    middlewares = applyMiddleware(routerMiddleware(history), logger, sagaMiddleware);
  } else {
    middlewares = applyMiddleware(routerMiddleware(history), sagaMiddleware);
  }

  var store = createStore(allReducers, middlewares);
  sagaMiddleware.run(rootSaga);
  return store;
};
