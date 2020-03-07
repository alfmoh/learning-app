import * as React from 'react';
import axios from 'axios';

class Post extends React.Component<any, any>  {

  state = {
    posts: []
  }

  async componentDidMount() {
    const {data} = await axios.get(`http://localhost:5000/api/posts/questions`);
    this.setState({
      posts: (data as any[]).slice(0, 5)
    })
    }

  trimParagraphs(body: string) {
    var y = body.trim().replace(/(<([^>]+)>)/ig, '');
    return y;
  }

  render() {
    return (
      <ul>
        { this.state.posts.map((post: any) => <li key={post.id}>{this.trimParagraphs(post.body)}</li>)}
      </ul>
    )
  }
}

export default Post;
  