import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';

import Routes from '../../modules/routes';

const App = ({ history }) => {
  return (
    <>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </>
  )
};

export default App;
