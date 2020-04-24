import * as React from 'react';
import { List, Container, CardContent, Card } from 'semantic-ui-react';
import './User.scss';
import UserMap from '../UserMap';

class User extends React.Component<any, any> {
    state = {
        activeTab: 'history'
    };
    switchContent() {
        switch (this.state.activeTab) {
            case 'history':
            default:
                return <div>History</div>;
            case 'map':
                return <UserMap />;
            case 'settings':
                return <div>Settings</div>;
        }
    }
    public render() {
        return (
            <Container>
                <div className="la-user-container">
                    <Card>
                        <CardContent>
                            <List selection verticalAlign="middle">
                                <List.Item
                                    onClick={() => {
                                        this.setState({
                                            activeTab: 'history'
                                        });
                                    }}
                                >
                                    <List.Content>
                                        <List.Header>History</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item
                                    onClick={() => {
                                        this.setState({
                                            activeTab: 'map'
                                        });
                                    }}
                                >
                                    <List.Content>
                                        <List.Header>Learning Map</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item
                                    onClick={() => {
                                        this.setState({
                                            activeTab: 'settings'
                                        });
                                    }}
                                >
                                    <List.Content>
                                        <List.Header>Settings</List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </CardContent>
                    </Card>
                    <div className="la-user-content content--background">
                        {this.switchContent()}
                    </div>
                </div>
            </Container>
        );
    }
}

export default User;
