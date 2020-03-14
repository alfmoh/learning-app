import * as React from 'react';
import { Menu, Input, Button, Dropdown } from 'semantic-ui-react';
import './Nav.scss';

class Nav extends React.Component<any, any> {
  state = {};

  public render() {
    return (
      <div className="la-menu-container">
        <Menu secondary>
          <Menu.Item header>Learning App</Menu.Item>
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item>
            <span className="la-question">
              <Button color="green">Ask a question</Button>
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
    );
  }
}

export default Nav;
