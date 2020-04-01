import React, { Component } from 'react';

import './Auth.scss';
import { Container, Tab } from 'semantic-ui-react';
import Register from '../Register';
import Login from '../Login';

class Auth extends Component<any> {
    panes = [
        {
            menuItem: 'Register',
            render: () => (
                <Tab.Pane>
                    <Register />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Login',
            render: () => (
                <Tab.Pane>
                    <Login />
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
