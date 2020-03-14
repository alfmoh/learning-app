import React from 'react';
import axios from 'axios';
import './App.scss';
import Post from '../Post';
import Nav from '../Nav';

export class App extends React.Component {
  state = {
    posts: []
  };
  private URL = `http://localhost:5000/api/posts/questions`;

  async componentDidMount() {
    const { data } = await axios.get(this.URL);
    this.setState({
      posts: (data as any[]).slice(0, 5)
    });
  }

  render() {
    return (
      <div className="app-main">
        <div className="la-nav-bar">
          <Nav />
        </div>
        <div className="la-posts">
          {this.state.posts.map((post: any) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
