import * as React from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Post from '../Post';
import './Home.scss';
import { IQuestionAnswer } from '../../../Models/IQuestionAnswer';

class Home extends React.Component<any, any> {
  state = {
    posts: [] as Array<IQuestionAnswer>
  };
  private URL = `http://localhost:5000/api/posts/fullposts`;

  async componentDidMount() {
    const { data } = await axios.get(this.URL);
    this.setState({
      posts: (data as Array<IQuestionAnswer>).slice(0, 5)
    });
  }
  public render() {
    return (
      <div className="la-posts">
        {this.state.posts.map((post: IQuestionAnswer) => (
          <Link className="la-post-link" key={post.question.id} to={'post/' + post.question.id}>
            <Post post={post} />
          </Link>
        ))}
      </div>
    );
  }
}

export default Home;
