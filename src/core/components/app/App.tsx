import React, { Fragment } from 'react';

import './App.scss';
import { Router } from '@reach/router';
import PostDetail from '../PostDetail';
import Home from '../Home';
import Nav from '../Nav';

export class App extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="app-main">
          <div className="la-nav-bar">
            <Nav />
          </div>
          <Router>
            <PostDetail path="post/:id" />
            <Home path="/" />
          </Router>
        </div>
      </Fragment>
    );
  }
}

export default App;
