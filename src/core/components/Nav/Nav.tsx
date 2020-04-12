import * as React from 'react';
import {
    Menu,
    Input,
    Button,
    Dropdown,
    Container,
    Modal
} from 'semantic-ui-react';
import './Nav.scss';
import { Link } from '@reach/router';
import Auth from '../Auth';
import {AppContext} from '../../../shared/contexts/Context';

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
                                    <Modal
                                        className="la-nav-question__modal"
                                        size="tiny"
                                        trigger={
                                            <Button color="green">
                                                Ask a question
                                            </Button>
                                        }
                                        centered={false}
                                    >
                                        <Modal.Header>
                                            Login or register to ask a question
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Auth />
                                        </Modal.Content>
                                    </Modal>
                                )}
                            </span>
                            <span>
                                <Dropdown icon="user">
                                    <Dropdown.Menu>
                                        <Dropdown.Item text="New" />
                                        <Dropdown.Item text="Open..." />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Container>
        );
    }
}

export default Nav;
