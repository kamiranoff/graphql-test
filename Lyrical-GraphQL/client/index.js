import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import ApolloCient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './Components/App';
import SongList from './Components/SongList';
import SongCreate from './Components/SongCreate';
import SongDetail from './Components/SongDetail';

const client = new ApolloCient();
const logger = createLogger({
  collapsed: true,
  diff: true,
});
const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {},
  compose(
    applyMiddleware(client.middleware(), thunk, promise, logger),
    // If you are using the devToolsExtension, you can add it here also
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);


const Root = () => {
  return (
    <ApolloProvider store={store} client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:title/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
