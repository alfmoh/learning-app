import * as React from 'react';
import { Menu, Input, Button, Dropdown, Container } from 'semantic-ui-react';
import './Nav.scss';
import { Link, navigate } from '@reach/router';
import { AppContext } from '../../../shared/contexts/Context';

class Nav extends React.Component<any, any> {
    static contextType = AppContext;
    state = {};

    public render() {
        return (
            <Container fluid>
                <div className="la-menu-container">
                    <Menu secondary>
                        <Menu.Item header>
                            <Link to="/">Learning App</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Input
                                className="icon"
                                icon="search"
                                placeholder="Search..."
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <span className="la-question">
                                {this.context.auth.loginUser ? (
                                    <Link to="question">
                                        <Button color="green">
                                            Ask a question
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        color="green"
                                        onClick={() => {
                                            navigate('/auth');
                                        }}
                                    >
                                        Ask a question
                                    </Button>
                                )}
                            </span>
                            <span>
                                {!this.context.auth.loginUser ? (
                                    <Button
                                        color="blue"
                                        onClick={() => {
                                            navigate('/auth');
                                        }}
                                    >
                                        Login
                                    </Button>
                                ) : (
                                    <Dropdown icon="user" className="link item">
                                        <Dropdown.Menu>
                                            <Dropdown.Item text="My Profile" />
                                            <Dropdown.Item
                                                text="Logout"
                                                onClick={() => {
                                                    return (() => {
                                                        this.context.auth.logout();
                                                        this.props.onLogout();
                                                    })();
                                                }}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Container>
        );
    }
}

export default Nav;
