import * as React from 'react';
import { Menu, Input, Button, Icon } from 'semantic-ui-react';

class Nav extends React.Component<any, any> {
  state = {};
  public render() {
    return (
      <Menu widths={3}>
        <Menu.Item header>Learning App</Menu.Item>
        <Menu.Item>
          <Input className="icon" icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item>
          <span>
            <Button color="green">Ask a question</Button>
          </span>
          <span>
            <Button icon>
              <Icon name="user" />
            </Button>
          </span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;
