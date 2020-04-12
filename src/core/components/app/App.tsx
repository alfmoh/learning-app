import React, { Fragment, Suspense } from 'react';

import './App.scss';
import { Router, Location } from '@reach/router';
import PostDetail from '../PostDetail';
import Home from '../Home';
import Nav from '../Nav';
import Question from '../Question';
import Auth from '../Auth';
import { AuthService } from '../../../services/Auth.service';
import { AppContext, LocationContext } from '../../../shared/contexts/Context';

export class App extends React.Component {
    render() {
        const auth = new AuthService();
        let prev = '/';
        let current = '';
        return (
            <Fragment>
                <AppContext.Provider value={{ auth }}>
                    <div className="app-main">
                        <div className="la-nav-bar la-sticky">
                            <Nav />
                        </div>
                        <Suspense fallback={<h1>Loading....</h1>}>
                            <Location>
                                {({ location }) => {
                                    prev = current ? current : '/';
                                    current = location.pathname;
                                    return (
                                        <LocationContext.Provider
                                            value={{ path: { prev, current } }}
                                        >
                                            <LocationContext.Consumer>
                                                {appPath => (
                                                    <Router className="la-content">
                                                        <PostDetail
                                                            appPath={appPath}
                                                            path="posts/:id"
                                                        />
                                                        <Home
                                                            appPath={appPath}
                                                            path="/"
                                                        />
                                                        <Question
                                                            appPath={appPath}
                                                            path="question"
                                                        />
                                                        <Auth
                                                            appPath={appPath}
                                                            path="auth"
                                                        />
                                                    </Router>
                                                )}
                                            </LocationContext.Consumer>
                                        </LocationContext.Provider>
                                    );
                                }}
                            </Location>
                        </Suspense>
                    </div>
                </AppContext.Provider>
            </Fragment>
        );
    }
}

export default App;
