import React, { Component } from 'react';

import './Auth.scss';
import { Container, Tab } from 'semantic-ui-react';
import Register from '../Register';
import Login from '../Login';
import { navigate } from '@reach/router';

class Auth extends Component<any> {
    constructor(props: any) {
        super(props);
        this.onAuthenticated = this.onAuthenticated.bind(this);
    }
    onAuthenticated() {
        if (this.props.appPath) {
            const { path } = this.props.appPath;
            navigate(path.prev);
            this.props.onAuth();
        } else navigate('/');
    }
    panes = [
        {
            menuItem: 'Login',
            render: () => (
                <Tab.Pane>
                    <Login onAuth={this.onAuthenticated} />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Register',
            render: () => (
                <Tab.Pane>
                    <Register onAuth={this.onAuthenticated} />
                </Tab.Pane>
            )
        }
    ];

    render() {
        return (
            <Container>
                <div className="auth-wrapper">
                    <Tab panes={this.panes} />
                </div>
            </Container>
        );
    }
}

export default Auth;
