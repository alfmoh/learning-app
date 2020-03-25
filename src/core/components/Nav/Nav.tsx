import * as React from 'react';
import { Menu, Input, Button, Dropdown, Container } from 'semantic-ui-react';
import './Nav.scss';
import { Link } from '@reach/router';

class Nav extends React.Component<any, any> {
  state = {};

  public render() {
    return (
      <Container fluid>
        <div className="la-menu-container">
        <Menu secondary>
          <Menu.Item header>
            <Link to="/">
              Learning App
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item>
            <span className="la-question">
              <Link to="question">
                <Button color="green">Ask a question</Button>
              </Link>
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
