import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import sagas from './sagas';

export const history = createBrowserHistory();

export default () => {
  const initialState = {};
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];
  
  const composeEnhancers = 
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
      : compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  sagaMiddleware.run(sagas);

  return store;
};
