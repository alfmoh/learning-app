import * as React from 'react';
import axios from 'axios';
import './Post.scss';
import { Image, List, Container, Card } from 'semantic-ui-react';

class Post extends React.Component<any, any> {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `http://localhost:5000/api/posts/questions`
    );
    this.setState({
      posts: (data as any[]).slice(0, 5)
    });
  }

  trimParagraphs(body: string) {
    var y = body.trim().replace(/(<([^>]+)>)/gi, '');
    return y.length > 250 ? y.slice(0, 250) + '......' : y;
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <section className="la-card">
            <section className="la-card-container">
              {this.state.posts.map((post: any) => {
                return (
                  <article key={post.id} className="la-card-content">
                    <section className="la-card-content__question">
                      <strong>{this.trimParagraphs(post.body)}</strong>
                    </section>
                    <section className="la-card-content__answer">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Labore ut magni recusandae excepturi tempore. Minus illum
                      voluptatibus necessitatibus molestias, aut laudantium vero
                      at nostrum tempora optio itaque sequi rem odio?
                    </section>
                  </article>
                );
              })}
            </section>
          </section>
        </Container>
      </React.Fragment>
    );
  }
}

export default Post;
