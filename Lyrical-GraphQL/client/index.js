import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import ReactDOM from 'react-dom';
import  ApolloCient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import reducers from './reducers';

import SongList from './Components/SongList';

const client = new ApolloCient();
const logger = createLogger({
  collapsed:true,
  diff:true,
});
const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    reducers,
  }),
  {},
  compose(
    applyMiddleware(client.middleware(),thunk, promise, logger),
    // If you are using the devToolsExtension, you can add it here also
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);


const Root = () => {
  return (
    <ApolloProvider store={store} client={client}>
      <SongList />
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
