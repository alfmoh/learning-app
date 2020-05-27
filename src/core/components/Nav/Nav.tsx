import * as React from 'react';
import { Menu, Input, Button, Dropdown, Container } from 'semantic-ui-react';
import './Nav.scss';
import { Link, navigate } from '@reach/router';
import { AppContext } from '../../../shared/contexts/Context';
import { AuthService } from '../../../services/Auth.service';
import { PostDetailInstance } from '../PostDetail';
import { Neo4jService } from '../../../services/Neo4j.service';

class Nav extends React.Component<any, any> {
    static contextType = AppContext;
    neoService: Neo4jService;
    constructor(props: any) {
        super(props);
        this.searchKeyword = this.searchKeyword.bind(this);
        this.neoService = new Neo4jService();
    }
    state = {
        user: null
    };

    searchKeyword(text: string) {
        PostDetailInstance.loadTag(text);
    }

    componentDidMount() {
        const authService = new AuthService();
        this.setState({
            user: authService.getUser()
        });
    }

    public render() {
        return (
            <Container fluid>
                <div className="la-menu-container">
                    <Menu secondary>
                        <Menu.Item header>
                            <Link
                                onClick={() => {
                                    this.neoService.childNodes = [];
                                }}
                                to="/"
                            >
                                Learning App
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Input
                                className="icon"
                                icon="search"
                                placeholder="Search..."
                                onKeyDown={(e: any) => {
                                    let searchWord: string = e.target.value;
                                    if (
                                        e.keyCode === 13 &&
                                        searchWord.trim().length > 2
                                    ) {
                                        navigate(`/posts/${searchWord}`).then(
                                            () => {
                                                if (
                                                    window.location.pathname.includes(
                                                        'posts/'
                                                    )
                                                ) {
                                                    this.searchKeyword(
                                                        searchWord
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }}
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
                                            <Link
                                                to={
                                                    'user/' +
                                                    this.state.user?.nameid
                                                }
                                            >
                                                <Dropdown.Item text="My Profile" />
                                            </Link>
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
