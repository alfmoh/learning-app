import * as React from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Post from '../Post';
import './Home.scss';

class Home extends React.Component<any, any> {
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
  public render() {
    return (
      <div className="la-posts">
        {this.state.posts.map((post: any) => (
          <Link className="la-post-link" key={post.id} to={'post/' + post.id}>
            <Post post={post} />
          </Link>
        ))}
      </div>
    );
  }
}

export default Home;
