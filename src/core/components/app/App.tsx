import React, { Fragment, Suspense } from 'react';

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
          <div className="la-nav-bar la-sticky">
            <Nav />
          </div>
          <Suspense fallback={<h1>Loading....</h1>}>
            <Router className="la-content">
              <PostDetail path="posts/:id" />
              <Home path="/" />
            </Router>
          </Suspense>
        </div>
      </Fragment>
    );
  }
}

export default App;
