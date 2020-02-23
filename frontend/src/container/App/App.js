import React from 'react';
import { Provider } from 'react-redux';
import { ConfirmProvider } from "material-ui-confirm";
import { ConnectedRouter } from 'connected-react-router/immutable';

import configureStore, { history } from '../../store';
import Routes from '../../modules/routes';

const store = configureStore();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ConfirmProvider>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </ConfirmProvider>
      </Provider>
    </>
  )
};

export default App;
